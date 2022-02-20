import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAction } from '../reducers/post';

function PostForm() {
  const dispatch = useDispatch();
  const { imagePaths, addPostSuccess, addPostLoading } = useSelector(
    (state) => state.post,
  );
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  });
  const onSubmit = useCallback(() => {
    dispatch(addPostAction(text));
  }, [text]);
  useEffect(() => {
    if (addPostSuccess) {
      setText('');
    }
  }, [addPostSuccess]);

  const imgRef = useRef();
  const onClickImgUpload = useCallback(() => {
    imgRef.current.click();
  }, []);
  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="무슨일이 있나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imgRef} />
        <Button onClick={onClickImgUpload}>이미지 업로드</Button>
        <Button htmlType="submit" type="primary" loading={addPostLoading}>
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
