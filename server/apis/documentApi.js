/**
 * Created by eatong on 17-11-29.
 */
const {LogicError} = require('../framework/errors');
const documentServer = require('../services/documentServer');

module.exports = class DocumentApi {


  static async getDocuments(ctx) {
    return await documentServer.getDocuments(ctx.request.body.moduleId);
  }

  static async getDocumentDetail(ctx) {
    return await documentServer.getDocumentDetail(ctx.request.body);
  }


  static async search(ctx) {
    const result = await documentServer.search(ctx.request.body);
    return result.map(item => ({...item._doc, content: item.content.replace(/<[^>]*>/g, '').slice(0, 100)}));
  }


  static async detailWithChildren(ctx) {
    return await documentServer.detailWithChildren(ctx.request.body);
  }

  static async viewDocByThirdParty(ctx) {
    return await documentServer.viewDocByThirdParty(ctx.request.body);
  }


  static async addDocument(ctx) {
    const data = ctx.request.body;
    return await documentServer.addDocument(data);

  }


  static async deleteDocument(ctx) {
    const data = ctx.request.body;
    return await documentServer.deleteDocument(data.id);

  }

  static async updateDocument(ctx) {
    const data = ctx.request.body;
    return await documentServer.updateDocument(data);

  }


  static async authAddDocument(ctx) {
    const data = ctx.request.body;
    return await documentServer.authAddDocument(data);
  }

  static async authUpdateDocument(ctx) {
    const data = ctx.request.body;
    return await documentServer.authUpdateDocument(data);

  }

  static async authDeleteDocument(ctx) {
    const data = ctx.request.body;
    return await documentServer.authDeleteDocument(data);

  }
}
