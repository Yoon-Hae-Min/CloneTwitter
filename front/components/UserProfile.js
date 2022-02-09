import { Avatar, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logOutAction } from "../reducers/User";

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logOutAction());
  });
  return (
    <Card
      actions={[
        <div key="twit">
          짹쨱
          <br />
        </div>,
        <div key="followings">
          팔로윙
          <br />
        </div>,
        <div key="followers">
          팔로워
          <br />
        </div>,
      ]}
    >
      <Meta title="Haemin" avatar={<Avatar>Haemin</Avatar>}></Meta>
      <Button onClick={onLogOut} type="primary">
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
