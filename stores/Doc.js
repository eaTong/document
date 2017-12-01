/**
 * Created by eatong on 17-12-1.
 */
import {observable, action, computed, toJS} from 'mobx';

export default class Doc {
  @observable content = '';

  @action
  onChangeContent(content) {
    this.content = content;
  }
}
