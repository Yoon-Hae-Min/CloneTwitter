import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logInAction } from "../reducers/User";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const LoginFormWrapper = styled(Form)`
  padding: 10px;
`;
const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onChangeId = useCallback((event) => {
    setId(event.target.value);
  });

  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  });
  const onFinishLogin = () => {
    dispatch(logInAction({ id, password }));
  };
  return (
    <LoginFormWrapper onFinish={onFinishLogin}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId}></Input>
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
        ></Input>
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
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
};

export default Login;
