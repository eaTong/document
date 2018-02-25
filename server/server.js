const path = require('path');
const next = require('next');
const {useStaticRendering} = require('mobx-react');
const Koa = require('koa');
const body = require('koa-body');
const koaConnect = require('koa-connect');
const compression = require('compression');
const cookie = require('koa-cookie').default;
const session = require('koa-session-store');
const mongoStore = require('koa-session-mongo');
const {createLogger, transports} = require('winston');
const router = require('./routers');
const {connection} = require('./mongoConfig');
const staticCache = require('koa-static-cache');
const serve = require('koa-static');
const cors = require('koa-cors');
const routes = require('../page-routes');

const port = parseInt(process.env.PORT, 10) || 8090;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
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
  app.use(serve('.next/static'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true
  });
  app.use(staticCache(path.join(__dirname, 'static'), {
    maxAge: 365 * 24 * 60 * 60
  }));
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
//cross origin
  app.use(cors({methods: 'GET'}));
  //use body to resolve data
  app.use(body({multipart: true}));

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

  const handler = routes.getRequestHandler(nextApp);
  app.use(ctx => {
    ctx.respond = false;
    ctx.res.statusCode = 200; // because koa defaults to 404
    handler(ctx.req, ctx.res)
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`)
  });
});
