import path from 'path';
import next from 'next';
import {useStaticRendering} from 'mobx-react';
import Koa from 'koa';
import koaBody from 'koa-body';
import koaConnect from 'koa-connect';
import compression from 'compression';
import cookie from 'koa-cookie';
import session from 'koa-session-store';
import mongoStore from 'koa-session-mongo';
import {createLogger, transports} from 'winston';
import router from './routers';
import {connection} from './mongoConfig';
import staticCache from 'koa-static-cache';


const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();
//define logger
const logger = createLogger({
  level: 'info',
  transports: dev ? undefined : [
    new transports.File({filename: 'error.log', level: 'error'}),
    new transports.File({filename: 'combined.log'})
  ]
});

useStaticRendering(true);

nextApp.prepare().then(() => {
  const app = new Koa();
//use compression
  app.use(koaConnect(compression()));
  // app.use(koaLogger());
  app.use(cookie());
//define mongo session storage...
  app.use(session({
    name: 'eaTong-session-id',
    signed: true,
    overwrite: true,
    store: mongoStore.create({mongoose: connection})
  }));
  app.keys = ['key for eaTong'];
  //inject logger to ctx
  app.use(async (ctx, next) => {
    ctx.logger = logger;
    await next();
  });

  //use koaBody to resolve data
  app.use(koaBody({multipart: true}));

  app.use(staticCache(path.join(__dirname, 'static'), {
    maxAge: 365 * 24 * 60 * 60
  }));
//all routes just all API
  app.use(router.routes());

  // /admin pages need to check login
  router.get('/admin*', async (ctx, next) => {
    if (!ctx.session.loginUser) {
      ctx.redirect('/login');
    } else {
      await next();
    }
  });

  //next handle all router
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`)
  });
});
