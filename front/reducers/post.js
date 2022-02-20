import produce from 'immer';
import shortid from 'shortid';
import faker from '@faker-js/faker';

const initialState = {
  mainPosts: [],

  imagePaths: [],

  loadPostsLoading: false,
  loadPostsSucess: false,
  loadPostsError: null,
  hasMorePosts: true,

  addPostLoading: false,
  addPostSucess: false,
  addPostError: null,

  removePostLoading: false,
  removePostSucess: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentSucess: false,
  addCommentError: null,

  removeCommentLoading: false,
  removeCommentSucess: false,
  removeCommentError: null,
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const DummyPost = (data) => ({
  id: data.postId,
  User: {
    id: 2,
    nickname: 'Haemin',
  },
  content: data.content,

  Images: [],
  Comments: [],
});

export const DummyComment = (data) => ({
  User: {
    id: 2,
    nickname: 'Hae-Min',
  },
  content: data,
});

export const generateDummyPost = (dataNum) => Array(dataNum).fill().map(() => ({
  id: shortid.generate(),
  User: {
    id: shortid.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.imageUrl(),
  }],
  Comments: [{
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.sentence(),
  }],

}));

export const addPostAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const removePostAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostSucess = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.mainPosts.unshift(DummyPost(action.data));
      // concat과의 차이는 unshift는 배열하나에 데이터를 넣는것이고 concat은 동등한 level에 데이터를 합친다
      draft.addPostLoading = false;
      draft.addPostSucess = true;
      break;
    case ADD_POST_FAILURE:
      draft.addPostError = action.error;
      draft.addPostLoading = false;
      break;

    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsSucess = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.mainPosts = draft.mainPosts.concat(action.data);
      // 여기에 직접적으로 generateDummyPost를 작성해도 되지만 saga에 작성해서 API호출했을때랑 같은 방식으로 갈것이다
      draft.hasMorePosts = draft.mainPosts.length < 50;
      draft.loadPostsLoading = false;
      draft.loadPostsSucess = true;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsError = action.error;
      draft.loadPostsLoading = false;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostSucess = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      draft.removePostLoading = false;
      draft.removePostSucess = true;
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostError = action.error;
      draft.removePostLoading = false;
      break;

    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentSucess = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(DummyComment(action.data.content));
      draft.addCommentLoading = false;
      draft.addCommentSuccess = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentError = action.error;
      draft.addCommentLoading = false;
      break;
    default:
      break;
  }
});

export default reducer;
