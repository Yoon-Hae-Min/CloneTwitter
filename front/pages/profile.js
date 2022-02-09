import React from "react";
import AppLayOut from "../components/AppLayOut";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
const profile = () => {
  const FollowerList = [
    { nickName: "A" },
    { nickName: "B" },
    { nickName: "C" },
  ];
  const FollowingList = [
    { nickName: "A" },
    { nickName: "B" },
    { nickName: "C" },
  ];
  return (
    <>
      <Head>
        <title>profile</title>
      </Head>
      <AppLayOut>
        <NickNameEditForm />
        <FollowList header="팔로워 목록" data={FollowerList} />
        <FollowList header="팔로윙 목록" data={FollowingList} />
      </AppLayOut>
      ;
    </>
  );
};

export default profile;
