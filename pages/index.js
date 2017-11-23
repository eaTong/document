import React from 'react'
import Page from '../components/Page'
import Link from 'next/link';
import Head from 'next/head'
import {inject, observer} from 'mobx-react';
import ajax from '../util/ajaxUtil';

@inject('blog') @observer
class Index extends React.Component {


  render() {
    const {blog} = this.props;
    return (
      <div className="hero is-medium">
        <Head>
          <title>quick start for next.js and mobx</title>
        </Head>
        <Link href='/todo'>todo page....</Link>
      </div>
    )
  }
}

export default Page(Index);
