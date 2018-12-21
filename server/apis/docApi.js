/**
 * Created by eatong on 17-11-29.
 */
const {LogicError} = require('../framework/errors');
const docServer = require('../services/docServer');
const catalogServer = require('../services/catalogServer');

module.exports = class DocApi {

  static async getDocs() {
    return await docServer.getDocs();
  }

  static async addDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.addDoc(data);

  }

  static async deleteDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.deleteDoc(data.id);

  }

  static async getDocByCatalog(ctx) {
    const data = ctx.request.body;
    return await docServer.getDocByCatalog(data.catalogId);

  }

  static async viewDocByCatalog(ctx) {
    const {body} = ctx.request;
    const readDoc = ctx.session.readDoc || {};
    const blogHasRead = readDoc[body.catalogId];
    if (!blogHasRead) {
      readDoc[body.catalogId] = true;
      ctx.session.readDoc = readDoc;
    }
    return await docServer.getDocByCatalog(body.catalogId, !blogHasRead);
  }

  static async detailWithChildren(ctx) {
    const {body} = ctx.request;
    const readDoc = ctx.session.readDoc || {};
    const blogHasRead = readDoc[body.catalogId];
    if (!blogHasRead) {
      readDoc[body.catalogId] = true;
      ctx.session.readDoc = readDoc;
    }
    const detail = await docServer.getDocByCatalog(body.catalogId, !blogHasRead);
    const children = await catalogServer.getChildrenOfCatalog(body.catalogId);
    return {...detail, children};
  }

  static async viewDocByThirdParty(ctx) {
    const {body} = ctx.request;
    const readDoc = ctx.session.readDoc || {};
    const blogHasRead = readDoc[body.thirdPartyKey];
    if (!blogHasRead) {
      readDoc[body.thirdPartyKey] = true;
      ctx.session.readDoc = readDoc;
    }
    //if has read , should not add viewCount
    return await docServer.viewDocByThirdParty({
      thirdPartyKey: body.thirdPartyKey,
      moduleId: body.moduleId
    }, !blogHasRead);
  }


  static async updateDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.updateDoc(data, ctx.session.loginUser);

  }


  static async publishDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.publishDoc(data, ctx.session.loginUser);

  }
}
