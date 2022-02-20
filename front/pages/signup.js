import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../Hooks/useInput';
import AppLayOut from '../components/AppLayOut';

const ErrorMessage = styled.div`
  color: red;
`;

const signup = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState();
  const [passwordError, setPasswordError] = useState(true);
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(true);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(passwordCheck === password);
  }, []);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError((pre) => !pre);
  }, []);
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
    }
    if (!term) {
      setTermError(true);
    }
    console.log(id, password, term);
  }, [password, passwordCheck, term]);
  return (
    <AppLayOut>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} />
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
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input
            name="user-password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </div>
        {passwordError && (
          <ErrorMessage>비밀번호가 서로 맞지 않습니다</ErrorMessage>
        )}
        <div>
          <label htmlFor="user-term">약관 동의</label>
          <br />
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의 하시겠습니까?
          </Checkbox>
        </div>
        {termError && <ErrorMessage>약관에 동의하셔야 합니다</ErrorMessage>}
        <Button htmlType="submit" type="pirmary">
          회원가입
        </Button>
      </Form>
    </AppLayOut>
  );
};

export default signup;
