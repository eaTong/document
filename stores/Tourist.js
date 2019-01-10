/**
 * Created by eatong on 17-12-5.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import stores from './index';
import {message} from 'antd';
import router from 'next/router';

export default class Tourist {
  @observable modules = [];
  @observable catalog = [];
  @observable contentDetail = {};
  @observable parentCatalog = {};
  @observable relativeCatalogs = [];
  @observable showDoc = true;

  @action
  async getPublishedDoc(catalog) {
    if (catalog.published) {
      const {success, data} = await ajax({
        url: '/api/pub/doc/detail/catalog',
        method: 'get',
        data: {catalogId: catalog._id}
      });
      if (success) this.document = data;
    }
  }

  @action clearContent() {
    this.document = {};
  }

  @action
  async search({keywords, moduleId}) {
    router.push(`/search?keywords=${keywords}&moduleId=${moduleId}`);
  }
}
