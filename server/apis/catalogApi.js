/**
 * Created by eatong on 17-11-29.
 */
const {LogicError} = require('../framework/errors');
const catalogServer = require('../services/catalogServer');

module.exports =class CatalogApi {


  static async getCatalogs(ctx) {
    return await catalogServer.getCatalogs(ctx.request.body.moduleId);
  }


  static async search(ctx) {
    return await catalogServer.search(ctx.request.body);
  }


  static async addCatalog(ctx) {
    const data = ctx.request.body;
    return await catalogServer.addCatalog(data);

  }


  static async deleteCatalog(ctx) {
    const data = ctx.request.body;
    return await catalogServer.deleteCatalog(data.id);

  }

  static async updateCatalog(ctx) {
    const data = ctx.request.body;
    return await catalogServer.updateCatalog(data);

  }


  static async authAddCatalog(ctx) {
    const data = ctx.request.body;
    return await catalogServer.authAddCatalog(data);
  }

  static async authUpdateCatalog(ctx) {
    const data = ctx.request.body;
    return await catalogServer.authUpdateCatalog(data);

  }

  static async authDeleteCatalog(ctx) {
    const data = ctx.request.body;
    return await catalogServer.authDeleteCatalog(data);

  }
}
