/**
 * Created by eatong on 17-11-29.
 */
import React, {Component} from 'react';
import {Page, AdminLayout} from '~components';
import {inject, observer} from 'mobx-react';
import {Button, Table} from 'antd';
import ajax from '../../../util/ajaxUtil';
import AccountModal from '../../../modals/AccountModal';

const ButtonGroup = Button.Group;

@inject('account') @observer
class Account extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {key: 'name', title: '姓名', dataIndex: 'name'},
      {key: 'account', title: '账号', dataIndex: 'account'},
      {
        key: 'operate', title: '操作', dataIndex: '_id', render: (val, data, index) => {
        return (
          <ButtonGroup>
            <Button icon="edit" onClick={() => this.props.account.toggleAccountModal('edit', data)}/>
            <Button icon="delete" onClick={() => this.props.account.deleteAccount(val, data, index)}/>
          </ButtonGroup>
        );
      }
      },
    ];
  }

  static async init(ctx) {
    const {data} = await ajax({url: '/api/account/get', ctx});
    return {account: {accountList: data}};
  }

  render() {
    const {account} = this.props;
    return (
      <AdminLayout head={
        (<div>
          <span className="label">用户管理</span>
          <div className="operate">
            <Button icon="plus" type="primary" onClick={() => {
              account.toggleAccountModal('add');
            }}>新建</Button>
          </div>
        </div>)
      }>
        <Table dataSource={account.accountList} columns={this.columns} pagination={false}/>
        {account.showAccountModal && (
          <AccountModal
            operateType={account.operateType}
            formData={account.currentAccount}
            onOk={data => account.onSaveAccount(data)}
            onCancel={() => account.toggleAccountModal()}
          />
        )}
      </AdminLayout>
    );
  }
}

Account.propTypes = {};
export default Page(Account);
