/**
 * Created by eatong on 17-11-29.
 */
import React from 'react';
import Head from 'next/head'

const Title = props => {
  return (
    <Head>
      <title>{props.children}</title>
    </Head>
  )
};
Title.propsType = {};
export default Title;
