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
class Doc extends Component {

  static async init(ctx) {
    const {catalogId, id} = ctx.query;
    const result = {tourist: {showDoc: !!catalogId}};
    const {data} = await ajax({url: '/api/pub/document/detail', method: 'get', data: {catalogId: id}, ctx});
    result.tourist.catalog = data;
    console.log(result);
    return result;
  }

  render() {
    const {tourist} = this.props;
    return (
      <div className={`document-page ${tourist.showDoc ? 'show-doc' : 'show-catalog'}`}>
        <Title>{`${tourist.catalog && tourist.catalog.name || ''}`}</Title>

        <div className="content " dangerouslySetInnerHTML={{__html: tourist.catalog.content}}/>
        <style jsx>{`
          .document-page{
            padding:10px;
            width: 100%;
            overflow: hidden;

          }
        .content img{
          display:in-block;
          max-width:100%;
          height:auto;
        }
        `}</style>
      </div>

    );
  }
}

Doc.propTypes = {};
export default Page(Doc);
