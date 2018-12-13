/**
 * Created by eatong on 17-12-1.
 */
import React, {Component} from 'react';
import {Page, AdminLayout, Editor} from '~components';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import ajax from "../../../util/ajaxUtil";
import {Button, Breadcrumb} from 'antd';

const BreadcrumbItem = Breadcrumb.Item;

@inject('doc') @observer
class Doc extends Component {

  static async init(ctx) {
    const {success, data} = await ajax({url: '/api/doc/detail/catalog', data: {catalogId: ctx.query.catalogId}, ctx});
    return {doc: {content: data.content, catalog: data.catalog}};
  }

  render() {
    const {doc} = this.props;
    return (
      <AdminLayout
        title='文档管理'
        head={(
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href='/admin/document/module'><a>模块管理</a></Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={`/admin/document/catalog?moduleId=${doc.catalog.module}`}><a>目录管理</a></Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {doc.catalog.name}
            </BreadcrumbItem>
          </Breadcrumb>
        )}>
        <div className="container">
          <Editor
            onChange={data => doc.onChangeContent(data)}
            className={'editor'}
            value={doc.content}
            ref={editor => this.editor = editor}
          />
          <div className="footer">
            <Button onClick={() => doc.saveDoc(this.editor.editor.getContent())}>保存</Button>
            <Button type="primary" onClick={() => doc.publishDoc(this.editor.editor.getContent())}>保存并发布</Button>
          </div>
        </div>
        <style jsx>{`
          .container{
            display:flex;
            flex-direction: column;
            height: 100%;
          }
          .container .editor{
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
