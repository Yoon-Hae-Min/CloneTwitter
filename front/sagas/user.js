import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from '../reducers/User';

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* logIn(action) {
  console.log('saga log');
  try {
    //     const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* logOut(action) {
  try {
    // const result = yield call(logoutAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI(data) {
  return axios.post('/api/logout', data);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, SignUp);
}

function* SignUp(action) {
  try {
    // const result = yield call(SignUpAPI, action.data);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function SignUpAPI(data) {
  return axios.post('/api/SignUp', data);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, Follow);
}

function* Follow(action) {
  try {
    // const result = yield call(FollowAPI, action.data);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function FollowAPI(data) {
  return axios.post('/api/Follow', data);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, Unfollow);
}

function* Unfollow(action) {
  try {
    // const result = yield call(UnfollowAPI, action.data);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function UnfollowAPI(data) {
  return axios.post('/api/Unfollow', data);
}

export default function* user() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUnfollow),
    fork(watchFollow)]);
}
