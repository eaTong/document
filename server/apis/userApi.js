/**
 * Created by eatong on 17-11-7.
 */
const {checkArgument} = require('../framework/apiDecorator');
const {LogicError} = require('../framework/errors');
const userServer = require('../services/userServer');

module.exports =class UserApi {


  static async login(ctx) {
    const data = ctx.request.body;
    const user = await userServer.login(data.account, data.password);
    if (user) {
      ctx.session.loginUser = user;
      return true;
    } else {
      throw (new LogicError('账号或密码错误'));
    }
  }

  static async getAccounts(ctx) {
    return await userServer.getAccounts();
  }


  static async addAccount(ctx) {
    const data = ctx.request.body;
    return await userServer.addAccount(data);
  }


  static async updateAccount(ctx) {
    const data = ctx.request.body;
    return await userServer.updateAccount(data);
  }


  static async deleteAccount(ctx) {
    const data = ctx.request.body;
    return await userServer.deleteAccount(data.id);
  }
}
