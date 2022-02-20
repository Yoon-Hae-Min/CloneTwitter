import { Avatar, Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutRequestAction } from '../reducers/User';

function UserProfile() {
  const dispatch = useDispatch();
  const { LogOutLoading, user } = useSelector((state) => state.User);
  const onLogOut = useCallback(() => {
    dispatch(logOutRequestAction());
  });
  return (
    <Card
      actions={[
        <div key="twit">
          짹쨱
          <br />
          {user.Posts.length}
        </div>,
        <div key="followings">
          팔로윙
          <br />
          {user.Followings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {user.Followers.length}
        </div>,
      ]}
    >
      <Meta title="Haemin" avatar={<Avatar>{user.nickname[0]}</Avatar>} />
      <Button onClick={onLogOut} type="primary" loading={LogOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
}

export default UserProfile;
