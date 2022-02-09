const initialState = {
  isLoggedIn: false,
  user: null,
  singupDate: {},
  loginData: {},
};

export const logInAction = (data) => {
  return {
    type: "LOG_IN", //action의 이름
    data, // data:data로 key value가 같아서 생략해 준것이다
  };
};

export const logOutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
