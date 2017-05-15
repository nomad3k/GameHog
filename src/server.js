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
import { playerJoined, playerQuit, playerConnected, playerDisconnected } from './client/store/actions';

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

let users = { };

io.on('connection', function(client) {
  console.log('connected');

  // ---------------------------------------------------------------------------

  client.on('disconnect', function() {
    console.log('disconnected');
    if (client.user) {
      client.user.connected = false;
      client.broadcast.emit('event', playerConnected(client.user.username));
    }
  });

  // ---------------------------------------------------------------------------

  client.on('login', function(args, callback) {
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
    io.sockets.emit('event', playerConnected(user.username));
    callback({
      ok: true,
      message: 'Success',
      user: user
    });
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
    io.sockets.emit('event', playerJoined({
      username: data.username,
      playerName: data.playerName,
      characterName: data.characterName
    }));
    users[data.username] = user;
    callback({ ok: true, message: 'Success' });
  });

  // ---------------------------------------------------------------------------

  client.on('event', function(data) {
    console.log('event', data);
    // client.emit('event', data);
    client.broadcast.emit('event', data);
  });
});

server.listen(config.port, () => {
  console.log(`Running on http://localhost:${config.port}/`);
});
