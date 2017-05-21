/* eslint-disable no-console */
import http from 'http';
import path from 'path';
import Koa from 'koa';
import koaSend from 'koa-send';
import koaStatic from 'koa-static';
import koaWebpack from 'koa-webpack';
import SocketIO from 'socket.io';
import validate from 'validation-unchained';

import config from './cfg/config';
import webpackConfig from './cfg/webpack.config.dev.js';
import createStore from './client/store/store';
import * as Actions from './client/store/actions';

import User from './user';

console.log('Starting...');

const app = new Koa();

const content = koaStatic(path.join(__dirname, 'content'), { });

app.use(koaWebpack({
  config: webpackConfig
}));

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${ms}ms`);
});

app.use(content);

app.use(async ctx => {
  await koaSend(ctx, 'content/index.html', { root: __dirname });
});

const server = http.createServer(app.callback());
const io = SocketIO(server);

const store = createStore();
let users = { };

io.on('connection', function(client) {
  console.log(`client connected: ${client.id}`);

  client.emit('players', store.getState().players);
  client.emit('documents', store.getState().documents);

  // ---------------------------------------------------------------------------

  function process(event) {
    store.dispatch(event);
    io.sockets.emit('event', event);
  }

  // ---------------------------------------------------------------------------

  client.on('disconnect', function() {
    console.log('disconnected');
    if (client.user) {
      client.user.connected = false;
      process(Actions.playerDisconnected(client.user.username));
    }
  });

  // ---------------------------------------------------------------------------

  client.on('login', function(args, callback) {
    if (client.user) {
      return callback({ ok:false, errors: { username: ['Already logged in.'] } });
    }
    const { errors, data } = validate(args, {
      strict: true,
      rules: {
        username: { type: String, required: true },
        password: { type: String, required: true }
      }
    });
    if (errors) {
      return callback({ ok: false, errors });
    }
    let user = users[data.username];
    if (!user || !user.matchPassword(data.password)) {
      return callback({ ok: false, errors: { username: [ 'Unknown username or password.' ] } });
    }
    client.user = user;
    user.connected = true;
    callback({ ok: true, message: 'Success', user: user.data() });
    process(Actions.playerConnected(user.username));
  });

  // ---------------------------------------------------------------------------

  client.on('logout', function(callback) {
    if (!client.user) {
      return callback({ ok:false, errors: { username: ['Not logged in.'] } });
    }
    const username = client.user.username;
    delete client.user;
    callback({ ok: true, message: 'Success' });
    process(Actions.playerDisconnected(username));
  });

  // ---------------------------------------------------------------------------

  client.on('register', function(args, callback) {
    const { errors, data } = validate(args, {
      strict: true,
      rules: {
        username: { type: String, required: true },
        password: { type: String, required: true },
        confirmPassword: { type: String, required: true },
        playerName: { type: String, required: true },
        characterName: { type: String, required: true }
      }
    });
    if (errors) return callback({ ok: false, errors });
    if (users[data.username])
      return callback({ ok: false, errors: { username: ['User exists.'] } });
    let user = new User(data.username,
                        data.password,
                        data.playerName,
                        data.characterName);
    users[data.username] = user;
    callback({ ok: true, message: 'Success', user: user.data() });
    process(Actions.playerJoined({
      username: data.username,
      playerName: data.playerName,
      characterName: data.characterName
    }));
  });

  // ---------------------------------------------------------------------------

  client.on('event', function(data) {
    console.log('event', data);
    process(data);
  });

});

server.listen(config.port, () => {
  console.log(`Running on http://localhost:${config.port}/`);
});
