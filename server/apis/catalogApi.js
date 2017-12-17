/**
 * Created by eatong on 17-11-29.
 */
import {checkArgument} from '../framework/apiDecorator';
import {LogicError} from '../framework/errors';
import catalogServer from '../services/catalogServer';

export default class CatalogApi {

  @checkArgument('moduleId')
  static async getCatalogs(ctx) {
    return await catalogServer.getCatalogs(ctx.request.body.moduleId);
  }

  @checkArgument(['name', 'moduleId'])
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

  @checkArgument(['name', 'moduleId', 'thirdPartyKey'])
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
