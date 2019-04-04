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
             .document-page{display:block;padding:0;}
             .document-page .catalog{width:100%;}
             .document-page .content{width:100%;overflow-x:hidden;}
            .document-page.show-catalog .content{display:none;}
            .document-page.show-doc .catalog{display:none;}
          }
        `}</style>
      </div>

    );
  }
}

Doc.propTypes = {};
export default Page(Doc);
