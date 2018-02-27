/**
 * Created by eatong on 17-11-29.
 */
import React from 'react';
import Head from 'next/head'

const Title = props => {
  return (
    <Head>
      <title>云智装文档-{props.children}</title>
    </Head>
  )
};
Title.propsType = {};
export default Title;
