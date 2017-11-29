import React from 'react'
import Link from 'next/link';
import Head from 'next/head'
import {inject, observer} from 'mobx-react';
import ajax from '../util/ajaxUtil';
import {Page, Title} from '../components'
import {Button} from 'antd';

@inject('blog') @observer
class Index extends React.Component {


  render() {
    const {blog} = this.props;
    return (
      <div className="">
        <Button>test button</Button>
      </div>
    )
  }
}

export default Page(Index);
