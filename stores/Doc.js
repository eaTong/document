/**
 * Created by eatong on 17-12-1.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import stores from './index'

export default class Doc {
  @observable content = '';

  @action
  onChangeContent(content) {
    console.log(content);
    this.content = content;
  }


  @action
  async saveDoc() {
    const {success, data} = await ajax({
      url: '/api/doc/update',
      data: {content: this.content, catalog: stores.app.query.catalogId}
    });
    console.log(success, data);
  }
}
