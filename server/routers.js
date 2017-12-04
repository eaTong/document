import Router from 'koa-router';
import TodoApi from './apis/todoApi';
import UserApi from './apis/userApi';
import moduleApi from './apis/moduleApi';
import catalogApi from './apis/catalogApi';
import docApi from './apis/docApi';
import {ArgMissError, LogicError} from './framework/errors';

const router = new Router();
//define data structure for all API
router.post('/api/*', async (ctx, next) => {
  if (!/^\/api\/pub/.test(ctx.originalUrl) && ctx.originalUrl !== '/api/user/login') {
    if (!ctx.session.loginUser) {
      ctx.status = 401;
      ctx.body = {success: false, data: {}, message: 'this api is not a public api ,plese login'};
      return;
    }
  }

  try {
    const data = await next();
    ctx.body = {success: true, data, message: ''};
  } catch (ex) {
    if (ex instanceof ArgMissError) {
      ctx.status = 400;
      ctx.body = {success: false, data: {}, message: ex.message};
    } else if (ex instanceof LogicError) {
      ctx.status = 200;
      ctx.body = {success: false, data: {}, message: ex.message};

    } else {
      ctx.status = 500;
      ctx.body = {success: false, data: {}, message: ex.message};
    }
  }
});


router.post('/api/todo/get', TodoApi.getTodo);
router.post('/api/todo/add', TodoApi.addTodo);
router.post('/api/todo/toggle', TodoApi.toggleTodo);

router.post('/api/user/login', UserApi.login);
router.post('/api/account/get', UserApi.getAccounts);
router.post('/api/account/add', UserApi.addAccount);
router.post('/api/account/update', UserApi.updateAccount);
router.post('/api/account/delete', UserApi.deleteAccount);

router.post('/api/module/get', moduleApi.getModules);
router.post('/api/module/add', moduleApi.addModule);
router.post('/api/module/update', moduleApi.updateModule);
router.post('/api/module/delete', moduleApi.deleteModule);

router.post('/api/catalog/get', catalogApi.getCatalogs);
router.post('/api/catalog/add', catalogApi.addCatalog);
router.post('/api/catalog/update', catalogApi.updateCatalog);
router.post('/api/catalog/delete', catalogApi.deleteCatalog);

router.post('/api/doc/get', docApi.getDocs);
router.post('/api/doc/add', docApi.addDoc);
router.post('/api/doc/detail/catalog', docApi.getDocByCatalog);
router.post('/api/doc/update', docApi.updateDoc);
router.post('/api/doc/publish', docApi.publishDoc);
router.post('/api/doc/delete', docApi.deleteDoc);

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

export default router;
