import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Col, Input, Menu, Row } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Login from './Login';
import UserProfile from './UserProfile';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

function AppLayOut({ children }) {
  const { user } = useSelector((state) => state.User);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key={1}>
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={2}>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={3}>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key={4}>
          <Link href="/signup">
            <a>로그인</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {user ? <UserProfile /> : <Login />}
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
}

AppLayOut.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayOut;
