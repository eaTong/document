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

const MODULE_ID = '5c19f0a8eea2235c75a0d28e';// 线上
// const MODULE_ID = '5c130ee0379ccc1d9ade7572';// 本地

@inject('tourist', 'app') @observer
class AppHelp extends Component {

  static async init(ctx) {
    const {catalogId} = ctx.query;
    const {data, success} = await ajax({
      url: '/api/pub/catalog/get',
      method: 'get',
      data: {moduleId: MODULE_ID},
      ctx
    });
    return {tourist: {helpCatalogs: data || []}};
  }

  render() {
    const {tourist, app} = this.props;
    return (
      <div className='help-page app'>
        <List>
          {tourist.helpCatalogs.map(item => (
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

        <style jsx>{`
          .link-item{
            margin-left:16px;

          }

          `}</style>
      </div>

    );
  }
}

AppHelp.propTypes = {};
export default Page(AppHelp);