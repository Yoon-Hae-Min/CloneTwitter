import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../Hooks/useInput';
import { addCommentAction } from '../reducers/post';

function CommentForm({ Post }) {
  const [commentText, onChangeCommentText, setCommentText] = useInput();
  const id = useSelector((state) => state.User.user?.id);
  const { addCommentSuccess, addCommentLoading } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();
  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentAction({ content: commentText, postId: Post.id, userId: id }),
    );
  }, [commentText]);

  useEffect(() => {
    if (addCommentSuccess) {
      setCommentText('');
    }
  }, [addCommentSuccess]);
  return (
    <Form onFinish={onSubmitComment}>
      <Input.TextArea
        value={commentText}
        onChange={onChangeCommentText}
      />
      <Button htmlType="submit" type="primary" loading={addCommentLoading}>
        삐약삐약
      </Button>
    </Form>
  );
}

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
