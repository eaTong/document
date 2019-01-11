/**
 * Created by eatong on 17-11-30.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from "../util/ajaxUtil";
import {message} from "antd/lib/index";
import stores from './index'

export default class Catelog {
  @observable query = {};
  @observable itemList = [];
  @observable expandedKeys = [];
  @observable operateType = 'add';
  @observable showCatalogModal = false;
  @observable currentCatalog = {};

  @action
  onSelectCatalog(selectedKey, event) {
    if (event.selected) {
      this.currentCatalog = event.node.props.catalog;
    } else {
      this.currentCatalog = {};
    }
  }

  @action
  onExpand(expandedKeys) {
    this.expandedKeys = expandedKeys;
    const LAST_EXPANDED_KEYS = 'lastExpandedKeys';
    window.localStorage.setItem(LAST_EXPANDED_KEYS + this.query.moduleId, JSON.stringify(expandedKeys))
  }

  @action
  async onSaveCatalog(form, moduleId) {
    if (this.operateType === 'add') {
      const {success, data} = await ajax({
        url: '/api/document/add',
        data: {...form, moduleId, parent: this.currentCatalog._id, level: this.currentCatalog.level + 1}
      });
      if (success) {
        await this.getCatalogs();
        this.toggleCatalogModal()
      }
    } else {
      const {success} = await ajax({url: '/api/document/update', data: {...form, id: this.currentCatalog._id}});
      if (success) {
        await this.getCatalogs();
        this.toggleCatalogModal()
      }
    }
  }

  @action
  async getCatalogs() {
    const {success, data} = await ajax({url: '/api/document/get', data: {moduleId: stores.app.query.moduleId}});
    if (success) this.itemList = data;
  }

  @action
  toggleCatalogModal(operate, catalog) {
    this.operateType = operate;
    this.currentCatalog = catalog === undefined ? this.currentCatalog : catalog;
    this.showCatalogModal = !this.showCatalogModal;
  }

  @action
  async deleteCatalog(val) {
    const {success} = await ajax({url: '/api/document/delete', data: {id: val}});
    if (success) {
      this.currentCatalog = {};
      message.success('删除用户成功！');
      await this.getCatalogs();
    }
  }
}
