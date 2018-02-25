/**
 * Created by eatong on 17-12-5.
 */
import React, {Component} from 'react';
import {Page, Title} from '~components';
import {inject, observer} from 'mobx-react'
import {Breadcrumb, Button, Tree} from 'antd';
import ajax from "../util/ajaxUtil";
import {Link} from '../page-routes'

const BreadcrumbItem = Breadcrumb.Item;
const TreeNode = Tree.TreeNode;


@inject('tourist', 'app') @observer
class Module extends Component {

  static async init(ctx) {
    const {catalogId, id} = ctx.query;
    const result = {tourist: {showDoc: !!catalogId}};
    const {data} = await ajax({url: '/api/pub/catalog/get', method: 'get', data: {moduleId: id}, ctx});
    result.tourist.catalog = data;
    if (catalogId && catalogId !== '0') {
      const doc = await ajax({
        url: '/api/pub/doc/detail/catalog',
        method: 'get',
        data: {catalogId: catalogId},
        ctx
      });
      result.tourist.document = doc ? doc.data : undefined;
    }

    return result;
  }

  renderTreeNodes(data) {
    const {id} = this.props.app.query;
    return data.map((item) => {
      const treeTitle = item.published ? (
        <Link route='doc' params={{id: id || '', catalogId: item._id || ''}}>
          <div className="tree-node" style={{display: 'flex', width: '100%'}}>
          <span
            className={`label ${item.published ? 'primary-text' : ''}`}
          >
            {item.name}
            </span>

          </div>
        </Link>
      ) : (
        <div className="tree-node" style={{display: 'flex', width: '100%'}}>
          <span
            className={`label ${item.published ? 'primary-text' : ''}`}
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
    const {tourist, app} = this.props;
    return (
      <div className={`document-page ${tourist.showDoc ? 'show-doc' : 'show-catalog'}`}>
        <Title>{`${tourist.document.catalog && tourist.document.catalog.name || ''}`}</Title>
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
        <div className="content ql-editor" dangerouslySetInnerHTML={{__html: tourist.document.content}}/>
        {!app.query.hideNav && (
          <Link href={`/doc?id=${app.query.id}`}><a className="back-to-catalog">返回目录</a></Link>
        )}
        <style jsx>{`
          .document-page{
            display:flex;
            padding:15px;

          }
          .document-page .catalog{
            min-width:200px;
            width:200px;

          }
          .document-page .back-to-catalog{
            display:none;
            position:fixed;
            right:10px;
            top:10px;
          }
          @media screen and (max-width:600px){
             .document-page{display:block;}
             .document-page .catalog{width:100%;}
             .document-page .content{width:100%;overflow-x:100%;}
            .document-page.show-catalog .content{display:none;}
            .document-page.show-doc .back-to-catalog{display:block;}
            .document-page.show-doc .catalog{display:none;}
          }
        `}</style>
      </div>

    );
  }
}

Module.propTypes = {};
export default Page(Module);
