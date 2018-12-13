/**
 * Created by eatong on 17-12-1.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import stores from './index';
import {message} from 'antd';

export default class Doc {
  @observable content = '';
  @observable catalog = {};

  @action
  onChangeContent(content) {
    this.content = content;
  }


  @action
  async saveDoc(content) {
    const {success, data} = await ajax({
      url: '/api/doc/update',
      data: {content, catalog: stores.app.query.catalogId}
    });
    if (success) message.success('编辑文档成功');
  }

  @action
  async publishDoc(content) {
    const {success, data} = await ajax({
      url: '/api/doc/publish',
      data: {content, catalog: stores.app.query.catalogId}
    });
    if (success) message.success('发布文档成功');
  }
}
