/**
 * Created by eatong on 17-11-7.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import Router from 'next/router';

export default class User {
  @observable userList = [];
  @observable operateType = 'add';
  @observable showAccountModal = false;

  @action
  async addAccount(form) {
    const {success, data} = await ajax({url: '/api/account/add', data: form});
    if (success) this.userList = [...this.userList, data];
    this.toggleAccountModal();
  }

  @action
  toggleAccountModal(operate) {
    this.operateType = operate;
    this.showAccountModal = !this.showAccountModal;
  }
}
