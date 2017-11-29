/**
 * Created by eatong on 17-11-7.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Page, AdminLayout} from '../../components';

@inject() @observer
class Admin extends Component {

  render() {
    return (
      <AdminLayout title="admin home page ....">
        admin home page...
      </AdminLayout>
    );
  }
}

Admin.propTypes = {};
export default Page(Admin);
