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
const MODULE_ID = process.env.NODE_ENV === 'production' ? '5c19f0a8eea2235c75a0d28e' : '5c19f0a8eea2235c75a0d28e';// 线上

@inject('tourist', 'app') @observer
class Content extends Component {

  static async init(ctx) {
    const {catalogId} = ctx.query;
    const tourist = {};

    const {data} = await ajax({
      url: '/api/pub/document/detail-with-children',
      method: 'get',
      data: {catalogId, moduleId: MODULE_ID},
      ctx
    });
    tourist.contentDetail = data || {};

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
            {tourist.contentDetail.document ? tourist.contentDetail.document.name : ''}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="content" dangerouslySetInnerHTML={{__html: tourist.contentDetail.document.content}}/>

        {(tourist.contentDetail.children || []).length > 0 && (
          <div className="children-document">
            <h2>{`更多'${tourist.contentDetail.document ? tourist.contentDetail.document.name : ''}'相关`}</h2>
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
        {(tourist.contentDetail.brothers || []).length > 0 && (
          <div className="brother-document">
            <h2>相关主题</h2>
            <List split={false}>
              {tourist.contentDetail.brothers.map(item => (
                <ListItem
                  key={item._id}
                  bordered={false}
                  onClick={() => router.push(`/help/content?catalogId=${item._id}`)}
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
