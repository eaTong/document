/**
 * Created by eatong on 17-11-5.
 */
import React, {Component} from 'react';
import {Page, Title} from '../components';
import {inject, observer} from 'mobx-react';
import {Form, Icon, Input, Button, Row, Col, List} from 'antd';
import ajax from "../util/ajaxUtil";
import router from "next/router";
import SearchBar from "../components/SearchBar";

const ListItem = List.Item;
const MODULE_ID = process.env.NODE_ENV === 'production' ? '5c19f0a8eea2235c75a0d28e' : '5c19f0a8eea2235c75a0d28e';// 线上

@inject('app', 'tourist') @observer
class Search extends Component {

  static async init(ctx) {
    const {moduleId, keywords} = ctx.query;
    const {data, success} = await ajax({
      url: '/api/pub/document/search',
      method: 'get',
      data: {moduleId, keywords},
      ctx
    });
    return {tourist: {searchResult: data || []}};
  }

  render() {
    const {tourist, app} = this.props;
    const hasSearchResult = (tourist.searchResult || []).length > 0;
    return (
      <div className='help-page app search'>
        <Title>搜索</Title>
        <SearchBar
          intialValue={app.query.keywords}
          placeholder={'输入主题进行搜索'}
          onSearch={(val) => tourist.search({keywords: val, moduleId: MODULE_ID})}
        />

        {hasSearchResult && (
          <List>
            {tourist.searchResult.map(item => {
              return (
                <ListItem
                  key={item._id}
                  bordered={false}
                  onClick={() => router.push(`/help/content?catalogId=${item._id}`)}
                >
                  <div className="link-item">
                    <a>{item.name}</a>
                    <div className="d-remark">{item.content}</div>
                  </div>
                </ListItem>
              )
            })}
          </List>
        )}

        {hasSearchResult || (
          <span>没有数据</span>
        )}

        <style jsx>{`
          .link-item{
            margin-left:16px;

          }

          `}</style>
      </div>
    );
  }
}

Search.propTypes = {};
export default Page(Search);
