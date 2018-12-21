/**
 * Created by eatong on 17-12-5.
 */
import React, {Component} from 'react';
import {Page, Title} from '~components';
import {inject, observer} from 'mobx-react'
import {Breadcrumb, List, Button, Tree} from 'antd';
import ajax from "../../util/ajaxUtil";
import router from 'next/router'

const ListItem = List.Item;
const MODULE_ID = '5c19f0a8eea2235c75a0d28e';

@inject('tourist', 'app') @observer
class Content extends Component {

  static async init(ctx) {
    const {catalogId, parentCatalog} = ctx.query;
    const tourist = {};

    const {data} = await ajax({
      url: '/api/pub/catalog/detail-with-children',
      method: 'get',
      data: {catalogId, moduleId: MODULE_ID},
      ctx
    });
    tourist.contentDetail = data || {};
    let relativeCatalogs = {};
    if (parentCatalog) {

      relativeCatalogs = await ajax({
        url: '/api/pub/catalog/detail-with-children',
        method: 'get',
        data: {catalogId: parentCatalog, moduleId: MODULE_ID},
        ctx
      });
      tourist.contentDetail.relativeCatalogs = relativeCatalogs.data.children || [];
    }

    return {tourist};
  }

  render() {
    const {tourist, app} = this.props;

    return (
      <div className='help-page app'>
        {!!tourist.contentDetail.content && (
          <h2>{tourist.contentDetail.catalog ? tourist.contentDetail.catalog.name : ''}</h2>
        )}
        <div className="content" dangerouslySetInnerHTML={{__html: tourist.contentDetail.content}}/>

        {(tourist.contentDetail.children || []).length > 0 && (
          <div className="children-document">
            <h2>{`更多'${tourist.contentDetail.catalog ? tourist.contentDetail.catalog.name : ''}'相关`}</h2>
            <List split={false}>
              {tourist.contentDetail.children.map(item => (
                <ListItem
                  key={item._id}
                  bordered={false}
                  onClick={() => router.push(`/help/content?catalogId=${item._id}&parentCatalog=${app.query.catalogId}`)}
                >
                  <div className="link-item">
                    <a>{item.name}</a>
                    {item.description && <div className="d-remark">{item.description}</div>}
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        {(tourist.contentDetail.relativeCatalogs || []).length > 0 && (
          <div className="brother-document">
            <h2>相关文档</h2>
            <List split={false}>
              {tourist.contentDetail.relativeCatalogs.map(item => (
                <ListItem
                  key={item._id}
                  bordered={false}
                  onClick={() => router.push(`/help/content?catalogId=${item._id}&parentCatalog=${app.query.parentCatalog}`)}
                >
                  <div className="link-item">
                    <a>{item.name}</a>
                    {item.description && <div className="d-remark">{item.description}</div>}
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        )}


        <style jsx>{`
        .help-page{
          padding:10px;

        }
        .help-page .content img{
          display:in-block;
          max-width:100%;
          height:auto;
        }
        .relative-document{


        }

        `}</style>
      </div>

    );
  }
}

Content.propTypes = {};
export default Page(Content);
