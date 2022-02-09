import { Form, Input } from "antd";
import React from "react";
import styled from "styled-components";

const EditForm = styled(Form)`
  marginbottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NickNameEditForm = () => {
  return (
    <EditForm>
      <Input.Search
        enterButton
        addonBefore="닉네임"
        enterButton="수정"
      ></Input.Search>
    </EditForm>
  );
};

export default NickNameEditForm;
