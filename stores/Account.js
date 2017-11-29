/**
 * Created by eatong on 17-11-7.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import {message} from 'antd';

export default class User {
  @observable accountList = [];
  @observable operateType = 'add';
  @observable showAccountModal = false;
  @observable currentAccount = {};

  @action
  async onSaveAccount(form) {
    if (this.operateType === 'add') {
      const {success, data} = await ajax({url: '/api/account/add', data: form});
      if (success) {
        this.accountList = [...this.accountList, data];
        this.toggleAccountModal()
      }
    } else {
      const {success, data} = await ajax({url: '/api/account/update', data: {...form, id: this.currentAccount._id}});
      if (success) {
        this.getAccounts();
        this.toggleAccountModal()
      }
    }
  }

  @action
  async getAccounts() {
    const {data} = await ajax({url: '/api/account/get'});
    this.accountList = data;
  }

  @action
  toggleAccountModal(operate, account) {
    this.operateType = operate;
    this.currentAccount = account;
    this.showAccountModal = !this.showAccountModal;
  }

  @action
  async deleteAccount(val, data, index) {
    const {success} = await ajax({url: '/api/account/delete', data: {id: val}});
    if (success) {
      message.success('删除用户成功！');
      this.getAccounts();
    }
  }
}
