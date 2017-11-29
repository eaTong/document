/**
 * Created by eatong on 17-11-29.
 */
import React, {Component} from 'react';
import {Page, AdminLayout} from '~components';
import {inject, observer} from 'mobx-react';
import {Button, Table} from 'antd';
import ajax from '../../../util/ajaxUtil';
import AccountModal from '../../../modals/AccountModal';

@inject('user') @observer
class Account extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {key: 'name', title: '姓名', dataIndex: 'name'},
      {key: 'account', title: '账号', dataIndex: 'account'},
    ];
  }

  static async init(ctx) {
    const {data} = await ajax({url: '/api/user/get', ctx});
    return {user: {userList: data}};
  }

  render() {
    const {user} = this.props;
    return (
      <AdminLayout head={
        (<div>
          <span className="label">用户管理</span>
          <div className="operate">
            <Button icon="plus" type="primary" onClick={() => {
              user.toggleAccountModal('add');
            }}>新建</Button>
          </div>
        </div>)
      }>
        <Table dataSource={user.userList} columns={this.columns} pagination={false}/>
        {user.showAccountModal && (
          <AccountModal onOk={data => user.addAccount(data)} onCancel={() => user.toggleAccountModal()}/>
        )}
      </AdminLayout>
    );
  }
}

Account.propTypes = {};
export default Page(Account);
