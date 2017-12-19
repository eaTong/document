import React from 'react'
import Link from 'next/link';
import Head from 'next/head'
import {inject, observer} from 'mobx-react';
import ajax from '../util/ajaxUtil';
import {Page, Title} from '../components';
import {Card} from 'antd';

@inject('tourist') @observer
class Index extends React.Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/pub/module/get', method: 'get', ctx});
    return {tourist: {modules: data}};
  }

  componentDidMount(){
    this.props.tourist.clearContent();
  }


  render() {
    const {tourist} = this.props;
    return (
      <div className="module-list">
        {tourist.modules.map(item => (
          <div className="module-item" key={item._id || 1}>
            <div className="title"><Link href={`/doc?id=${item._id}`}><a>{item.name}</a></Link></div>
            <div className="remark">{item.remark}</div>
          </div>
        ))}
        <style jsx>{`
          .module-list{
            padding:16px;
          }
          .module-list .module-item{
             padding-top: 16px;
             padding-bottom: 16px;
             border-bottom:1px solid #e5e5e5;

          }
          .module-list .module-item .title{
            color:#666;
            font-size:16px;
          }
          .module-list .module-item .remark{
            color:#aaa;
            font-size:12px;
          }
        `}</style>
      </div>
    )
  }
}

export default Page(Index);
