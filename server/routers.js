const Router = require('koa-router');
const {parse} = require('query-string');
const TodoApi = require('./apis/todoApi');
const UserApi = require('./apis/userApi');
const moduleApi = require('./apis/moduleApi');
const catalogApi = require('./apis/catalogApi');
const documentApi = require('./apis/documentApi');
const docApi = require('./apis/docApi');

const authCheck = require('./framework/authCheck');

const router = new Router();
router.get(/^\/api/, async (ctx, next) => {
  ctx.request.body = parse(ctx.req._parsedUrl.query || "");
  await next();
});
//define data structure for all API
router.post('/api/*', authCheck);
router.get('/api/*', authCheck);


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

router.post('/api/document/get', documentApi.getDocuments);
router.post('/api/document/detail', documentApi.getDocumentDetail);
router.post('/api/document/add', documentApi.addDocument);
router.post('/api/document/update', documentApi.updateDocument);
router.post('/api/document/delete', documentApi.deleteDocument);

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

router.get('/api/pub/module/get', moduleApi.getModules);
router.get('/api/pub/document/get', documentApi.getDocuments);
router.get('/api/pub/document/detail', documentApi.getDocumentDetail);
router.get('/api/pub/document/search', documentApi.search);
router.get('/api/pub/document/detail-with-children', documentApi.detailWithChildren);
router.get('/api/pub/doc/detail/catalog/third-party', documentApi.viewDocByThirdParty);

router.post('/api/auth/catalog/add', catalogApi.authAddCatalog);
router.post('/api/auth/catalog/update', catalogApi.authUpdateCatalog);
router.post('/api/auth/catalog/delete', catalogApi.authDeleteCatalog);

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});
router.get('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
