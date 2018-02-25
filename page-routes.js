/**
 * Created by eatong on 17-12-30.
 */
const routes = module.exports = require('next-routes')();

routes
  .add('module', '/module/:id', 'module')
  .add('doc', '/doc/:id/:catalogId', 'doc');
