import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';

function NodeBird({ Component }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta charSet="utf-8" />
      </Head>

      <Component />
    </>
  );
}

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(NodeBird);
