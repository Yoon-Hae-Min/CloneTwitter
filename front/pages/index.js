import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayOut from '../components/AppLayOut';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);
  useEffect(() => {
    function onScroll() {
      console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        console.log(loadPostsLoading);
        if (!loadPostsLoading && hasMorePosts) {
          console.log('dispatch');
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);// 여길 달아주니까 해결됐어????
  return (
    <AppLayOut>
      {user && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} Post={post} />
      ))}
    </AppLayOut>
  );
}

export default Home;
