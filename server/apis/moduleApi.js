/**
 * Created by eatong on 17-11-29.
 */
const {checkArgument} = require('../framework/apiDecorator');
const {LogicError} = require('../framework/errors');
const moduleServer = require('../services/moduleServer');

module.exports =class ModuleApi {

  static async getModules() {
    return await moduleServer.getModules();
  }

  // @checkArgument('name')
  static async addModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.addModule(data);

  }

  // @checkArgument('id')
  static async deleteModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.deleteModule(data.id);

  }

  // @checkArgument(['name', 'id'])
  static async updateModule(ctx) {
    const data = ctx.request.body;
    return await moduleServer.updateModule(data);

  }
}
