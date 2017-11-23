/**
 * Created by eatong on 17-11-7.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import Link from 'next/link';
import Head from 'next/head'
import {Page} from '../../components';


@inject() @observer
class Admin extends Component {

  static async init(req) {
  }

  render() {
    const {} = this.props;
    return (
      <div className="container">
        <Head>
          <title>admin home page...</title>
        </Head>
        admin page....
      </div>
    );
  }
}

Admin.propTypes = {};
export default Page(Admin);
