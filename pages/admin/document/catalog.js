/**
 * Created by eatong on 17-11-30.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import {inject, observer} from 'mobx-react'


@inject() @observer
class Catalog extends Component {

  static async init(ctx) {
  }

  render() {
    const {} = this.props;
    return (
      <div>

      </div>
    );
  }
}

Catalog.propTypes = {};
export default Page(Catalog);
