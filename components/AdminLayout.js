/**
 * Created by eatong on 17-11-29.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Icon} from 'antd';
import {inject, observer} from 'mobx-react';
import Title from './Title';
import router from 'next/router';

const {Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;

@inject('app') @observer
class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {app} = this.props;
    return (
      <div style={{height: '100vh'}}>
        <Title>{this.props.title || (typeof this.props.head === 'string' ? this.props.head : '')}</Title>
        <Layout>
          <Sider style={{overflow: 'auto', height: '100vh'}}>
            <Menu
              theme="dark"
              mode="inline"
              onSelect={({key}) => router.push(key)}
              defaultOpenKeys={[app.path.slice(0, app.path.lastIndexOf('/'))]}
              defaultSelectedKeys={[app.path]}
            >
              <SubMenu
                key="/admin/system"
                title={<span><Icon type="setting"/><span>系统管理</span></span>}
              >
                <Menu.Item key="/admin/system/account">用户管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key="/admin/document"
                title={<span><Icon type="setting"/><span>文档管理</span></span>}
              >
                <Menu.Item key="/admin/document/module">模块管理</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            {this.props.head && (
              typeof this.props.head === 'string' ? (
                <h2 className="head">
                  {this.props.head}
                </h2>
              ) : React.cloneElement(this.props.head, {className: 'head'})
            )}
            <div className="content">
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}

AdminLayout.propTypes = {
  head: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};
export default AdminLayout;
