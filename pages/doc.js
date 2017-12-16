/**
 * Created by eatong on 17-12-5.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import {inject, observer} from 'mobx-react'
import {Breadcrumb, Button, Tree} from 'antd';
import ajax from "../util/ajaxUtil";

const BreadcrumbItem = Breadcrumb.Item;
const TreeNode = Tree.TreeNode;


@inject('tourist') @observer
class Doc extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/pub/catalog/get',method:'get', data: {moduleId: ctx.query.id}, ctx});
    return {tourist: {catalog: data}};
  }

  renderTreeNodes(data) {
    return data.map((item) => {
      const treeTitle = (
        <div className="tree-node" style={{display: 'flex', width: '100%'}}>
          <span
            className={`label ${item.published ? 'primary-text' : ''}`}
            onClick={() => this.props.tourist.getPublishedDoc(item)}
          >
            {item.name}
            </span>
        </div>
      );
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode
            title={treeTitle}
            key={item._id}
            catalog={item}
            selectable={false}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={treeTitle} key={item._id} catalog={item} selectable={false}/>;
    });

  }

  render() {
    const {tourist} = this.props;
    return (
      <div className="document-page">
        <div className="catalog">
          {tourist.catalog.length > 0 && (
            <Tree
              autoExpandParent
              defaultExpandAll
            >
              {this.renderTreeNodes(tourist.catalog)}
            </Tree>
          )}
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html: tourist.document.content}}/>
        <style jsx>{`
          .document-page{
            display:flex;
            padding:15px;

          }
          .document-page.has-content .catalog{
            width:300px;
            transform:translateX(0);

          }
          .document-page .catalog{
            transform:translateX(0);
          }
          .document-page .content{

          }
        `}</style>
      </div>

    );
  }
}

Doc.propTypes = {};
export default Page(Doc);
