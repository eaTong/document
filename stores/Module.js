/**
 * Created by eatong on 17-11-29.
 */
import {observable, action, computed, toJS} from 'mobx';
import {message} from 'antd';
import ajax from '~util/ajaxUtil';

export default class Module {
  @observable itemList = [];
  @observable operateType = 'add';
  @observable showModuleModal = false;

  @action
  toggleModuleModal(operateType, form) {
    this.operateType = operateType;
    this.currentModule = form;
    this.showModuleModal = !this.showModuleModal;
  }

  @action
  async onSaveModule(module) {
    if (this.operateType === 'add') {
      const {success, data} = await ajax({url: '/api/module/add', data: module});
      if (success) {
        message.success('添加模块成功');
        this.toggleModuleModal();
        this.itemList = [...this.itemList, data]
      }
    } else {
      const {success, data} = await ajax({url: '/api/module/update', data: {...module, id: this.currentModule._id}});
      if (success) {
        this.toggleModuleModal();
        await this.getModules();
      }

    }
  }

  @action
  async deleteModule(id) {
    const {success} = await ajax({url: '/api/module/delete', data: {id}});
    if (success) {
      message.success('删除模块成功！');
      this.getModules();
    }
  }

  @action
  async getModules() {
    const {success, data} = await ajax({url: '/api/module/get'});
    if (success) {
      this.itemList = data;
    }
  }
}
