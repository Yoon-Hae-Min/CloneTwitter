import { Button } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/User';

function FollowButton({ Post }) {
  const dispatch = useDispatch();
  const { user, FollowLoading, UnFollowLoading } = useSelector((state) => state.User);
  const isFollowing = user?.Followings.find((v) => v.id === Post.User.id);
  const onClickFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: Post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: Post.User.id,
      });
    }
  }, [isFollowing]);
  return (
    <Button onClick={onClickFollow} loading={FollowLoading || UnFollowLoading}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
}

FollowButton.propTypes = {
  Post: PropTypes.object.isRequired,
};

export default FollowButton;
