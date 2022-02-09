import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import useInput from "../Hooks/useInput";
import PropTypes from "prop-types";
const CommentForm = ({ Post }) => {
  const [commentText, onChangeCommentText] = useInput();
  const onSubmitComment = useCallback(() => {
    console.log(Post.id, commentText);
  });
  return (
    <Form onFinish={onSubmitComment}>
      <Input.TextArea
        value={commentText}
        onChange={onChangeCommentText}
      ></Input.TextArea>
      <Button htmlType="submit" type="primary">
        삐약삐약
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  Post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default CommentForm;
