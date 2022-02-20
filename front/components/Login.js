import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logInRequestAction } from '../reducers/User';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const LoginFormWrapper = styled(Form)`
  padding: 10px;
`;
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { LogInLoading } = useSelector((state) => state.User);

  const dispatch = useDispatch();

  const onChangeemail = useCallback((event) => {
    setEmail(event.target.value);
  });

  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  });
  const onFinishLogin = () => {
    dispatch(logInRequestAction({ email, password }));
  };
  return (
    <LoginFormWrapper onFinish={onFinishLogin}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          type="email"
          name="user-email"
          value={email}
          onChange={onChangeemail}
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={LogInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </LoginFormWrapper>
  );
}

export default Login;
