/**
 * Created by eatong on 17-12-1.
 */
import React, {Component} from 'react';
import {Page, AdminLayout, Editor} from '~components';
import {inject, observer} from 'mobx-react';
import {Button} from 'antd';

@inject('doc') @observer
class Doc extends Component {

  static async init(ctx) {
  }

  render() {
    const {doc} = this.props;
    return (
      <AdminLayout title='文档管理'>
        <div className="container">
          <Editor onChange={data => doc.onChangeContent(data)}/>
          <div className="footer">
            <Button>保存</Button>
          </div>
        </div>
        <style jsx>{`
          .container{
            display:flex;
            flex-direction: column;
            height: 100%;
          }
          .container .quill{
            flex:1;
          }
          .container .footer{
            padding-top:10px;
            text-align:right;
          }
        `}</style>
      </AdminLayout>
    );
  }
}

Doc.propTypes = {};
export default Page(Doc);
