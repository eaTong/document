import React from 'react'
import {inject, observer} from 'mobx-react';
import ajax from '../util/ajaxUtil';
import {Page, Title} from '../components';
import {Link} from '../page-routes'

@inject('tourist') @observer
class Index extends React.Component {

  render() {
    const {tourist} = this.props;
    return (
      <div className="module-list">
        <Title>首页</Title>
        nothing to show...
      </div>
    )
  }
}

export default Page(Index);
