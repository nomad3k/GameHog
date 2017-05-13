/* eslint-disable no-console */
import http from 'http';
import path from 'path';
import Koa from 'koa';
import koaSend from 'koa-send';
import koaStatic from 'koa-static';
import koaWebpack from 'koa-webpack';
import IO from 'koa-socket';

import config from './cfg/config';
import webpackConfig from './cfg/webpack.config.dev.js';

console.log('Starting...');

const app = new Koa();
const io = new IO();

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

io.on('echo', (ctx, data) => {
  ctx.socket.emit('echo', data);
});

io.attach(app);

io.on('chat', function(ctx, data) {
  console.log('chat', data);
  ctx.acknowledge(data);
});

app.listen(3000, () => {
  console.log(`Running on http://localhost:${config.port}/`);
});
