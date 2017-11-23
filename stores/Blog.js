/**
 * Created by eatong on 17-11-16.
 */
import {observable, action, computed, toJS} from 'mobx';

export default class Blog {
  @observable blogList = [];
  @observable blog = [];

}
