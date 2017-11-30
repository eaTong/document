/**
 * Created by eatong on 17-11-29.
 */
import {checkArgument} from '../framework/apiDecorator';
import {LogicError} from '../framework/errors';
import catalogServer from '../services/catalogServer';

export default class CatalogApi {

  static async getCatalogs() {
    return await catalogServer.getCatalogs();
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
}
