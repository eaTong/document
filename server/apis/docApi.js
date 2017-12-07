/**
 * Created by eatong on 17-11-29.
 */
import {checkArgument} from '../framework/apiDecorator';
import {LogicError} from '../framework/errors';
import docServer from '../services/docServer';

export default class DocApi {

  static async getDocs() {
    return await docServer.getDocs();
  }

  static async addDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.addDoc(data);

  }

  @checkArgument('id')
  static async deleteDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.deleteDoc(data.id);

  }

  @checkArgument('catalogId')
  static async getDocByCatalog(ctx) {
    const data = ctx.request.body;
    return await docServer.getDocByCatalog(data.catalogId);

  }

  @checkArgument('catalogId')
  static async viewDocByCatalog(ctx) {
    const {body} = ctx.request;
    const readDoc = ctx.session.readDoc || {};
    const blogHasRead = readDoc[body.id];
    if (!blogHasRead) {
      readDoc[body.id] = true;
      ctx.session.readDoc = readDoc;
    }
    //if has read , should not add viewCount
    return await docServer.getDocByCatalog(body.catalogId, !blogHasRead);
  }

  @checkArgument(['content', 'catalog'])
  static async updateDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.updateDoc(data, ctx.session.loginUser);

  }

  @checkArgument(['content', 'catalog'])
  static async publishDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.publishDoc(data, ctx.session.loginUser);

  }
}
