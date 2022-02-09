import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import User from "./User";
import post from "./post";
//HYDRATE는 next-redux-wrapper를 쓸 때 필요한 액션인데요. 서버쪽에서 실행된 리덕스의 결과물이 프론트에서는 HYDRATE라는 액션 이름 아래에 데이터로 전달됩니다.

//이런 모양의 state를 만들것이다

// redux는 데이터를 중앙에서 하나로 통제해주기 위해서 사용한다 중앙 state가 바뀌면 이 것을 쓰는 component도 자동으로 변경된다
//redux는 state, action, reducer로 이루어져있고 state를 변경하고 싶으면 action을 dispatch해서 state를 변경해 준다
//state의 값을 확인하기 위해서는 useSelector를 이용한다
// dispatch(action(data))로 dispatch한다.
//
// reducer는 새로운 객체를 생성해서 return하는 것이기 때문에 데이터들이 기록에 남는다(불변성) 이전의 데이터 셋을 쉽게 복구 할수 있다.
// 대신에 그냥 하면 안보이고 middleware(액션이 리듀서로 전달되기 전후로 추가 작업을 실행해주는 함수입니다.)를 붙여야 한다 store의 configureStore 수정
//
// store는 그냥 리덕스 전체라고 보시면 되고요. 그 안에 state들과, action이 dispatch됐을 때 state를 어떻게 바꿀지 적어놓은 파일이 reducer입니다.

const rootReducer = combineReducers({
  //reducer는 함수라서 함수끼리 합치는건 어려움 따라서 redux내장 함수를 사용
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log(action);
        return { ...state, ...action.payload };

      default:
        return { ...state };
    }
  }, //hyfrate를 위해서(SSR을 사용하기 위해서) index reducer하나를 추가함
  User,
  post,
});

export default rootReducer;
