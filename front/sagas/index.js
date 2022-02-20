import { all, fork } from 'redux-saga/effects';
import post from './post';
import user from './user';

export default function* rootSaga() {
  yield all([fork(user), fork(post)]);
}

// 비동기로 실행 이벤트 리스너처럼 등록 만약 요청이 들어오면 함수실행
