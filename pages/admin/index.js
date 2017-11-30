/**
 * Created by eatong on 17-11-7.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Page, AdminLayout, Title} from '../../components';

@inject() @observer
class Admin extends Component {

  render() {
    return (
      <AdminLayout title="admin home page ....">
        <Title>后台管理-首页</Title>
        admin home page...
      </AdminLayout>
    );
  }
}

Admin.propTypes = {};
export default Page(Admin);
