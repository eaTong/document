/**
 * Created by eatong on 17-11-29.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import {inject, observer} from 'mobx-react'


@inject() @observer
class Module extends Component {

  static async init() {
  }

  render() {
    const {} = this.props;
    return (
      <div>

      </div>
    );
  }
}

Module.propTypes = {};
export default Page(Module);
