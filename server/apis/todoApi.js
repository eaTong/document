const {checkArgument} = require('../framework/apiDecorator');
const todoServer = require('../services/todoServer');


module.exports =class TodoApi {

  static async getTodo(ctx) {
    return await todoServer.findAllTodo();
  }


  static async addTodo(ctx) {
    const data = ctx.request.body;
    return await todoServer.addTodo(data.name);
  }


  static async toggleTodo(ctx) {
    const data = ctx.request.body;
    return await todoServer.toggleTodo(data._id);
  }
}



