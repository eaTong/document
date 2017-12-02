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

  @checkArgument(['content','catalog'])
  static async updateDoc(ctx) {
    const data = ctx.request.body;
    return await docServer.updateDoc(data);

  }
}
