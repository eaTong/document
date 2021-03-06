/**
 * Created by eatong on 17-11-30.
 */
import React, {Component} from 'react';
import {Page, AdminLayout} from '~components';
import CatalogModal from '../../../modals/CatelogModal';
import Link from 'next/link';
import {inject, observer} from 'mobx-react';
import {Badge, Breadcrumb, Button, Icon, Tree} from 'antd';
import ajax from "../../../util/ajaxUtil";

const BreadcrumbItem = Breadcrumb.Item;
const TreeNode = Tree.TreeNode;
const ButtonGroup = Button.Group;
const LAST_EXPANDED_KEYS = 'lastExpandedKeys';

@inject('catalog') @observer
class Catalog extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/document/get', data: {moduleId: ctx.query.moduleId}, ctx});
    return {catalog: {itemList: data, query: ctx.query}};
  }

  componentDidMount() {
    const expandedKeys = JSON.parse(localStorage.getItem(LAST_EXPANDED_KEYS + this.props.catalog.query.moduleId) || '[]');
    this.props.catalog.onExpand(expandedKeys);
  }

  renderTreeNodes(data) {
    return data.map((item) => {
      const treeTitle = (
        <div className="tree-node" style={{display: 'flex', width: '100%'}}>
          <span className="label">
            {item.name}

            {item.published && (<Icon type={'check'} className={'success-text'}/>)}
          </span>
          <span className="extensional">
           {item.published && (<Link href={`/doc?id=${item._id}`}><a>预览</a></Link>)}
            <span className="sort">{item.sort}</span>
            <Link href={`/admin/document/doc?catalogId=${item._id}`}><a>查看/编写</a></Link>
          </span>
        </div>
      );
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode icon={<Icon type={item.icon}/>} title={treeTitle} key={item._id} catalog={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode icon={<Icon type={item.icon}/>} title={treeTitle} key={item._id} catalog={item}/>
      )
    });
  }

  render() {
    const {catalog, query} = this.props;
    return (
      <AdminLayout title="目录管理" parentPath='/admin/document/module' head={(<div>
        <Breadcrumb className='label'>
          <BreadcrumbItem>
            <Link href='/admin/document/module'><a>模块管理</a></Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            目录管理
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="operate">
          <ButtonGroup>
            <Button icon="plus" onClick={() => catalog.toggleCatalogModal('add')}>新建</Button>
            {catalog.currentCatalog._id && (
              <Button icon="edit" onClick={() => catalog.toggleCatalogModal('edit', catalog.currentCatalog)}>编辑</Button>
            )}
            {catalog.currentCatalog._id && (
              <Button icon="delete" onClick={() => catalog.deleteCatalog(catalog.currentCatalog._id)}>删除</Button>
            )}
          </ButtonGroup>
        </div>
      </div>)}>
        {catalog.itemList.length > 0 && (
          <Tree
            autoExpandParent
            showLine
            expandedKeys={catalog.expandedKeys}
            onExpand={expandedKeys => catalog.onExpand(expandedKeys)}
            onSelect={(keys, node) => catalog.onSelectCatalog(keys, node)}
          >
            {this.renderTreeNodes(catalog.itemList)}
          </Tree>
        )}
        {catalog.showCatalogModal && (
          <CatalogModal
            operateType={catalog.operateType}
            formData={catalog.currentCatalog}
            onCancel={() => catalog.toggleCatalogModal()}
            onOk={(data) => catalog.onSaveCatalog(data, query.moduleId)}
          />
        )}
      </AdminLayout>
    );
  }
}

Catalog.propTypes = {};
export default Page(Catalog);
