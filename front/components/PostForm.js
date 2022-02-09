import { Button, Form, Input } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostAction } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths } = useSelector((state) => state.post);
  const [text, setText] = useState("");
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  });
  const onSubmit = () => {
    dispatch(addPostAction);
    setText("");
  };
  const imgRef = useRef();
  const onClickImgUpload = useCallback(() => {
    imgRef.current.click();
  }, []);
  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="무슨일이 있나요?"
      ></Input.TextArea>
      <div>
        <input type="file" multiple hidden ref={imgRef}></input>
        <Button onClick={onClickImgUpload}>이미지 업로드</Button>
        <Button htmlType="submit" type="primary">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v}></img>
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
