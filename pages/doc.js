/**
 * Created by eatong on 17-12-5.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import Link from 'next/link';
import {inject, observer} from 'mobx-react'
import {Breadcrumb, Button, Tree} from 'antd';
import ajax from "../util/ajaxUtil";
import catalog from "./admin/document/catalog";

const BreadcrumbItem = Breadcrumb.Item;
const TreeNode = Tree.TreeNode;


@inject('tourist', 'app') @observer
class Doc extends Component {

  static async init(ctx) {
    const result = {tourist: {showDoc: !!ctx.query.catalogId}};
    const {data} = await ajax({url: '/api/pub/catalog/get', method: 'get', data: {moduleId: ctx.query.id}, ctx});
    result.tourist.catalog = data;
    if (ctx.query.catalogId) {
      const doc = await ajax({
        url: '/api/pub/doc/detail/catalog',
        method: 'get',
        data: {catalogId: ctx.query.catalogId},
        ctx
      });
      result.tourist.document = doc ? doc.data : undefined;
    }

    return result;
  }

  renderTreeNodes(data) {
    return data.map((item) => {
      const treeTitle = item.published ? (
        <Link
          href={`/doc?id=${this.props.app.query.id}&catalogId=${item._id}`}>
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
        {!app.query.hideNav && (
          <Link href={`/doc?id=${app.query.id}`}><a className="back-to-catalog" >返回目录</a></Link>
        )}
        <style jsx>{`
          .document-page{
            display:flex;
            padding:15px;

          }
          .document-page.has-content .catalog{
            width:300px;

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

Doc.propTypes = {};
export default Page(Doc);
