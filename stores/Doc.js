/**
 * Created by eatong on 17-12-1.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import stores from './index';
import {message} from 'antd';

export default class Doc {
  @observable content = '';
  @observable document = {};

  @action
  onChangeContent(content) {
    this.content = content;
  }

  @action
  async publishDoc(content) {
    const {success, data} = await ajax({
      url: '/api/document/update',
      data: {...this.document, content, id: this.document._id, published: true}
    });
    if (success) message.success('发布文档成功');
  }
}
