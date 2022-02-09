const initialState = {
  mainPosts: [
    {
      id: 1, //개시글 자체의 내용
      User: {
        //다른 내용과 합쳐져서 나오는것
        id: 1,
        nickname: "Hae-Min",
      },
      content: "첫번째 개시글 #해시태그",
      Images: [
        {
          src: "https://mblogthumb-phinf.pstatic.net/MjAxNzEwMjRfMTAz/MDAxNTA4ODMwNDk3NDEw.3sdfJY7V0Flq1Evn_SQgZ86htMk_-Sh1G0gj3Vmwz6gg._xax8P4T4QV1HnxQgkQlL-fN2n8fjwf7Bj1OyVvDFXkg.PNG.googlesupport/image_search_1.png?type=w800",
        },
        {
          src: "https://mblogthumb-phinf.pstatic.net/MjAxNzEwMjRfMTAz/MDAxNTA4ODMwNDk3NDEw.3sdfJY7V0Flq1Evn_SQgZ86htMk_-Sh1G0gj3Vmwz6gg._xax8P4T4QV1HnxQgkQlL-fN2n8fjwf7Bj1OyVvDFXkg.PNG.googlesupport/image_search_1.png?type=w800",
        },
        {
          src: "https://mblogthumb-phinf.pstatic.net/MjAxNzEwMjRfMTAz/MDAxNTA4ODMwNDk3NDEw.3sdfJY7V0Flq1Evn_SQgZ86htMk_-Sh1G0gj3Vmwz6gg._xax8P4T4QV1HnxQgkQlL-fN2n8fjwf7Bj1OyVvDFXkg.PNG.googlesupport/image_search_1.png?type=w800",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "KIM",
          },
          content: "댓글1",
        },
        {
          User: {
            nickname: "Lee",
          },
          content: "댓글2",
        },
      ],
    },
  ],

  imagePaths: [],
  postAdd: false,
};
//이건 백앤드 개발자와 이야기를 하면서 구조를 짜야함
const ADD_POST = "ADD_POST";

const DummyPost = {
  id: 2,
  User: {
    id: 2,
    nickname: "Haemin",
  },
  content: "더미 포스트",

  Images: [],
  Comments: [],
};

export const addPostAction = {
  type: ADD_POST,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [DummyPost, ...state.mainPosts],
      };

    default:
      return state;
  }
};

export default reducer;
