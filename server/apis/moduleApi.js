/**
 * Created by eatong on 17-11-29.
 */
import {checkArgument} from '../framework/apiDecorator';
import {LogicError} from '../framework/errors';
import moduleServer from '../services/moduleServer';

export default class ModuleApi {

  static async getModules() {
    return await moduleServer.getModules();
  }

  @checkArgument('name')
  static async addModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.addModule(data);

  }

  @checkArgument('id')
  static async deleteModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.deleteModule(data.id);

  }

  @checkArgument(['name', '_id'])
  static async updateModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.updateModule(data);

  }
}
