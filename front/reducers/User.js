import shortid from 'shortid';
import produce from 'immer';

const initialState = {
  LogInLoading: false,
  LogInSuccess: false,
  LogInError: null,

  LogOutLoading: false,
  LogOutSuccess: false,
  LogOutError: null,

  SignUpLoading: false,
  SignUpSuccess: false,
  SignUpError: null,

  FollowLoading: false,
  FollowSuccess: false,
  FollowError: null,

  UnFollowLoading: false,
  UnFollowSuccess: false,
  UnFollowError: null,

  user: null, // 여기에 정보가 들어감
  singupDate: {},
  loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_USER = 'ADD_POST_TO_USER';

export const REMOVE_POST_TO_USER = 'REMOVE_POST_TO_USER';

const DummyUser = (data) => ({
  ...data,
  nickname: 'Haemin',
  id: 2,
  Posts: [{ id: 1 }],
  Followers: [
    {
      nickname: '응애',
      id: shortid.generate(),
    },
    {
      nickname: '두번쨰 팔로워',
      id: shortid.generate(),
    },
    {
      nickname: '세번째 팔로워',
      id: shortid.generate(),
    },
  ],
  Followings: [
    {
      nickname: '응애',
      id: shortid.generate(),
    },
    {
      nickname: '두번쨰 팔로워',
      id: shortid.generate(),
    },
    {
      nickname: '세번째 팔로워',
      id: shortid.generate(),
    },
  ],
});

export const logInRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logOutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.LogInLoading = true;
      draft.LogInSuccess = false;
      draft.LogInError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.LogInLoading = false;
      draft.LogInSuccess = true;
      draft.user = DummyUser(action.data);
      break;
    case LOG_IN_FAILURE:
      draft.LogInLoading = false;
      draft.LogInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.LogOutLoading = true;
      draft.LogOutSuccess = false;
      draft.LogOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.LogOutLoading = false;
      draft.LogOutSuccess = true;
      draft.user = null;
      break;
    case LOG_OUT_FAILURE:
      draft.LogOutLoading = false;
      draft.LogOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.SignUpLoading = true;
      draft.SignUpSuccess = false;
      draft.SignUpError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.SignUpLoading = false;
      draft.SignUpSuccess = true;
      break;
    case SIGN_UP_FAILURE:
      draft.SignUpLoading = false;
      draft.SignUpError = action.error;
      break;
    case FOLLOW_REQUEST:
      draft.FollowLoading = true;
      draft.FollowSuccess = false;
      draft.FollowError = null;
      break;
    case FOLLOW_SUCCESS:
      draft.FollowLoading = false;
      draft.FollowSuccess = true;
      draft.user.Followings.push({ id: action.data });
      break;
    case FOLLOW_FAILURE:
      draft.FollowLoading = false;
      draft.FollowError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.UnFollowLoading = true;
      draft.UnFollowSuccess = false;
      draft.UnFollowError = null;
      break;
    case UNFOLLOW_SUCCESS:
      draft.UnFollowLoading = false;
      draft.UnFollowSuccess = true;
      draft.user.Followings = draft.user.Followings.filter((v) => v.id !== action.data);
      break;
    case UNFOLLOW_FAILURE:
      draft.UnFollowLoading = false;
      draft.UnFollowError = action.error;
      break;
    case ADD_POST_TO_USER:
      draft.user.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_TO_USER:
      draft.user.Posts = draft.user.Posts.filter((v) => v.id !== action.data);
      break;
    default:
      break;
  }
});

export default reducer;
