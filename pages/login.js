/**
 * Created by eatong on 17-11-5.
 */
import React, {Component} from 'react';
import {Page} from '../components';
import {inject, observer} from 'mobx-react';
import getFormData from 'get-form-data';
import ajax from '../util/ajaxUtil';


@inject('user') @observer
class Login extends Component {

  onSubmit(event) {
    event.preventDefault();
    this.props.user.login(getFormData(document.querySelector('form')));
  }

  render() {
    const {} = this.props;
    return (
      <form className="columns" onSubmit={this.onSubmit.bind(this)} name="login">
        <input type="text" className="input" name="user"/>
        <input type="password" className="input" name="password"/>
        <button className="button is-primary" type="submit">登录</button>
      </form>
    );
  }
}

Login.propTypes = {};
export default Page(Login);
