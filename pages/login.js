/**
 * Created by eatong on 17-11-5.
 */
import React, {Component} from 'react';
import {Page} from '../components';
import {inject, observer} from 'mobx-react';
import {Form, Icon, Input, Button, Row, Col} from 'antd';

const FormItem = Form.Item;


@inject('app') @observer @Form.create()
class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.app.login(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Row style={{height: '100%'}} align="middle" type="flex">
        <Col span={8} offset={8}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{required: true, message: 'Please input your account!'}],
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="account"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: 'Please input your Password!'}],
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{float: 'right'}}>
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {};
export default Page(Login);
