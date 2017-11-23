/**
 * Created by eatong on 17-10-24.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';

export default class Todo {
  @observable itemList = [];

  @action
  async addTodo(name) {
    const {success, data} = await ajax({url: '/api/todo/add', data: {name}});
    if(success)this.itemList = [...this.itemList, data];
  }

  @action
  async toggleTodo(index) {
    const {success, data} = await ajax({url: '/api/todo/toggle', data: {_id: this.itemList[index]._id}});
    if(success)this.itemList[index] = data;
  }
}
