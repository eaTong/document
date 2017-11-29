/**
 * Created by eatong on 17-11-29.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';

const FormItem = Form.Item;

@Form.create()
class AccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.operateType === 'edit') {
      this.props.form.setFieldsValue(this.props.formData);
    }
  }

  onSaveData() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        message.error(errors);
        return;
      }
      this.props.onOk && this.props.onOk(values);
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };
    return (
      <Modal title={(this.props.operateType === 'add' ? '新增' : '编辑') + ''}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写姓名!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账号"
            hasFeedback>
            {getFieldDecorator('account', {
              rules: [{
                required: true, message: '请填写姓名!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback>
            {getFieldDecorator('password')(
              <Input/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

AccountModal.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
export default AccountModal;
