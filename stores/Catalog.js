/**
 * Created by eatong on 17-11-30.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from "../util/ajaxUtil";
import {message} from "antd/lib/index";
import stores from './index'

export default class Catelog {
  @observable itemList = [];
  @observable operateType = 'add';
  @observable showCatalogModal = false;
  @observable currentCatalog = {};

  @action
  onSelectCatalog(selectedKey, event) {
    console.log(event);
    if (event.selected) {
      this.currentCatalog = event.node.props.catalog;
    } else {
      this.currentCatalog = {};
    }
  }

  @action
  async onSaveCatalog(form, moduleId) {
    if (this.operateType === 'add') {
      const {success, data} = await ajax({
        url: '/api/catalog/add',
        data: {...form, moduleId, parent: this.currentCatalog._id, level: this.currentCatalog.level + 1}
      });
      if (success) {
        await this.getCatalogs();
        this.toggleCatalogModal()
      }
    } else {
      const {success} = await ajax({url: '/api/catalog/update', data: {...form, id: this.currentCatalog._id}});
      if (success) {
        await this.getCatalogs();
        this.toggleCatalogModal()
      }
    }
  }

  @action
  async getCatalogs() {

    console.log(stores.app);
    const {success, data} = await ajax({url: '/api/catalog/get', data: {moduleId: stores.app.query.moduleId}});
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
    const {success} = await ajax({url: '/api/catalog/delete', data: {id: val}});
    if (success) {
      message.success('删除用户成功！');
      await this.getCatalogs();
    }
  }
}
