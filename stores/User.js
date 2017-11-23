/**
 * Created by eatong on 17-11-7.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import Router from 'next/router';

export default class User {
  @observable loginUser = {};

  @action
  async login(form) {
    const {success} = await  ajax({url: '/api/user/login', data: form});
    if (success) Router.push('/admin');
  }
}
