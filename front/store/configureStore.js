import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import reducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const constfigureStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  //배포모드와 개발모드때 action을 로그해줄 대상이 다르다 개발모드는 devtools를 연결해서 history기록을 저장 및 보여주지만
  // 배포모드때는 보안이슈로 devtool에 연결하지 않는다.

  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(constfigureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
