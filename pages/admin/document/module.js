/**
 * Created by eatong on 17-11-29.
 */
import React, {Component} from 'react';
import router from 'next/router';
import {Page, AdminLayout} from '~components';
import {inject, observer} from 'mobx-react'
import {Button, Card, Icon} from 'antd';
import ModuleModal from '../../../modals/ModuleModal';
import ajax from '../../../util/ajaxUtil';

const ButtonGroup = Button.Group;

@inject('module') @observer
class Module extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/module/get', ctx});
    return {module: {itemList: data}};
  }

  renderExtra(item) {
    return (
      <ButtonGroup>
        <Button icon='edit' onClick={() => this.props.module.toggleModuleModal('edit', item)}/>
        <Button icon='delete' onClick={() => this.props.module.deleteModule(item._id)}/>
        <Button icon='setting' onClick={() => router.push(`/admin/document/catalog?moduleId=${item._id}`)}/>
      </ButtonGroup>
    )
  }

  render() {
    const {module} = this.props;
    return (
      <AdminLayout head='模块管理'>
        <div className="module-list">
          <div className="module-item add">
            <div className="button" onClick={() => module.toggleModuleModal('add')}>
              <Icon type="plus"/> 添加模块
            </div>
          </div>
          {module.itemList.map(item => (
            <div className="module-item" key={item._id || 1}>
              <Card title={item.name} extra={this.renderExtra(item)}>
                {item.remark}
              </Card>
            </div>
          ))}
        </div>
        {module.showModuleModal && (
          <ModuleModal
            operateType={module.operateType}
            formData={module.currentModule}
            onCancel={() => module.toggleModuleModal()}
            onOk={(data) => module.onSaveModule(data)}
          />
        )}
        <style jsx>{`
          .module-list{
            display:flex;
            flex-wrap:wrap;
          }
          .module-list .module-item.add{
            text-align:center;
            font-size:20px;
            border:1px solid #e9e9e9;
            display:flex;
            align-items:center;
          }
          .module-list .add .button{
            flex:1;
            text-align:center;
            cursor:pointer;
            padding:20px;
          }
          .module-list .module-item{
            min-width:300px;
            flex:1;
            margin:10px;
          }
        `}</style>
      </AdminLayout>
    );
  }
}

Module.propTypes = {};
export default Page(Module);
