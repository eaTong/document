/**
 * Created by eatong on 17-10-28.
 */
import {observable, action, computed, toJS} from 'mobx';
import router from 'next/router'
import ajax from '../util/ajaxUtil';

export default class App {
  @observable loadingCount = 0;
  @observable loadingUrl = {};
  @observable path = '';
  @observable query = {};
  @observable loginUser = {};

  @action
  async login(form) {
    const {success} = await  ajax({url: '/api/user/login', data: form});
    if (success) router.push('/admin');
  }

  @action
  loading(key) {
    if (this.loadingUrl[key]) {
      this.loadingUrl[key] = this.loadingUrl[key] + 1;
    } else {
      this.loadingUrl[key] = 1;
    }
    this.loadingCount++;
  }

  @action
  cancelLoading(key) {
    this.loadingCount = this.loadingCount > 0 ? 0 : this.loadingCount--;
    this.loadingUrl[key] = this.loadingUrl[key] - 1;
  }
}
