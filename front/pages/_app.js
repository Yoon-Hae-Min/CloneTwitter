import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta charSet="utf-8"></meta>
      </Head>

      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default NodeBird;
