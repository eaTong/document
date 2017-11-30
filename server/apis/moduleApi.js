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

  static async addModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.addModule(data);

  }

  static async deleteModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.deleteModule(data.id);

  }

  static async updateModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.updateModule(data);

  }
}
