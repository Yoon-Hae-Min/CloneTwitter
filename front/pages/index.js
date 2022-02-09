import React from "react";
import { useSelector } from "react-redux";
import AppLayOut from "../components/AppLayOut";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.User);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayOut>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} Post={post} />
      ))}
    </AppLayOut>
  );
};

export default Home;
