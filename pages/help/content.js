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
const MODULE_ID = process.env.NODE_ENV === 'production' ? '5c19f0a8eea2235c75a0d28e' : '5c130ee0379ccc1d9ade7572';// 线上

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
      tourist.relativeCatalogs = relativeCatalogs.data.children || [];
      tourist.parentCatalog = relativeCatalogs.data.catalog || {};
    }

    return {tourist};
  }

  render() {
    const {tourist, app} = this.props;

    return (
      <div className='help-page app'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a className={'breadcrumb-link'} href={'/help/app'}>帮助中心</a>
          </Breadcrumb.Item>
          {app.query.parentCatalog && (
            <Breadcrumb.Item>
              <a className={'breadcrumb-link'} href={`/help/content?catalogId=${app.query.parentCatalog}`}>
                {tourist.parentCatalog.name}
              </a>
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item>
            {tourist.contentDetail.catalog ? tourist.contentDetail.catalog.name : ''}
          </Breadcrumb.Item>
        </Breadcrumb>
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
                  onClick={() => window.location = (`/help/content?catalogId=${item._id}&parentCatalog=${app.query.catalogId}`)}
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
        {(tourist.relativeCatalogs || []).length > 0 && (
          <div className="brother-document">
            <h2>相关主题</h2>
            <List split={false}>
              {tourist.relativeCatalogs.map(item => (
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
          width: 100%;
          overflow: hidden;
        }
        .help-page .content img{
          display:in-block;
          max-width:100%;
          height:auto;
        }
        .breadcrumb-link{
          color:#1890ff;
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
