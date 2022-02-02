import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Col, Input, Menu, Row } from "antd";

const AppLayOut = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>로그인</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          왼쪽 빈 화면
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          오른쪽 빈 화면
        </Col>
      </Row>
    </div>
  );
};

AppLayOut.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayOut;
