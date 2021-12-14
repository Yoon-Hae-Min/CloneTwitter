# Twitter Clone Coding

------

## 준비

먼저 파이어베이스와 react app이 필요하다 `npx create-react-app "프로젝트이름"`으로 프로젝트를 설정하고 파이어베이스 프로젝트를 만들고 web으로 설정하고 안내하는대로 실행한다 https://firebase.google.com/docs/web/setup?authuser=0

react에 파이어베이스 세팅이 끝났다면 이 firebaseConfig가 있을것이다 여기에는 각종 key domain등등 조금 민감한 부분이 들어있는데 우리가 깃허브에 올릴때는 이것들을 제외시키고 올리고 싶다 그러기 위해서 .env파일 src상위폴더에 만든다 그리고 이 폴더에 firebaseConfig부분을 넣어줄 것인데 이떄 앞부분에 꼭 REACT_APP_~~~로 시작해야한다

```
// .env
REACT_APP_API_KEY ="개인 정보 내용"
REACT_APP_AUTH_DOMAIN ="개인 정보 내용"
REACT_APP_PROJECT_ID ="개인 정보 내용"
REACT_APP_STORAGE_BUCKET ="개인 정보 내용"
REACT_APP_MESSAGIN_ID ="개인 정보 내용"
REACT_APP_APP_ID ="개인 정보 내용"
```

이런식으로 넣을것이다 개인정보 내용에는 firebaseConfig부분의 내용들을 넣어두자 그리고 gitignore부분에 들어가 .env파일을 추가해 줌으로써 깃이 더이상 이 파일을 추적하지 않도록 설정한다

그다음으로는 firebase.js부분에 이 .env파일을 가져와서 사용할 것이다 다음과 같이 코딩한다

```react
// firebase.js
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export defau lt initializeApp(firebaseConfig);
```

이렇게 사용해도 결국에 코드가 실행되면 값들이 실제로 올라가 보인다는것이다 하지만 우리는 깃허브에 올라가지 않기만을 원했으므로 나중에 이런부분을 생각해서 추가적인 작업을 실행하면 좋을것이다.

##### 코드 틀짜기

기본적인 파일 틀은 component와 routes를 사용할 것이다.

├─components: App.js Router.js Navigator.js

└─routes: Auth.js, EditProfile.js, Home.js, Profile.js

```react
//Router.js
import react, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
const AppRouter = () => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);//로그인이 필요한지 관리하는 hook
  return (
    <Router>
      <Routes>
        {IsLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />}></Route>
          </>
        ) : (
          <Route exact path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;

```

기본적인 틀만 사용했다 로그인이되어있으면 Home화면으로 로그인이 안되어있으면 로그인창으로 넘어가도록 설정하였다

##### Absolute Imports

지금까지 사용한 경로들은 ../ ./ .//등 상대경로로 사용하였다 이러한 경우에는 파일을 다른곳으로 옮길때 path가 달라져 import 오류가 나게 된다 대신에 절대 경로로 바꾸어주어 위와같은 문제점을 해결한다

```json
// jsconfig.json 파일을 package와 같은 level에 생성
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}

```

이렇게 되면 경로를 "폴더명/파일명" 으로 바꿀수 있다

```react
import AppRouter from "./Router";
//에서
import AppRouter from "components/Router";
//로 바꿀수 있다.
```



##### Firebase Auth

(공식문서: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth) 

Firebase Auth를 사용하려면 firebase파일에 정의를 해주어야 한다

```react
import firebase from "firebase/compat/app"; //수정되었음
import "firebase/compat/auth"; //추가내용
//버전업으로 인해서 중간에 compat이 들어가야함
...중략...
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
//AUTH서비스를 많이 사용할 것이므로 authService변수로 export함
---------------------------------------------------------------------------------------------------
import { authService } from "fbase";// 받는쪽 지금은 app.js파일임
```



## 로그인

```react
//auth

const [newAccount, setNewAccount] = useState(true);
const [error, setError] = useState("");
```

로그인 페이지 구성으로는 먼저 파이어 베이스에 가서 어떤종류의 로그인을 할 것인지 등록을 해놓아야된다 이번에는 email google gihub를 사용할 예정이다 파이어 베이스의 Authenticaltion에 들어가 3개를 활성화한다 우리가 로그인할 페이지인 Auth.js파일에 로그인 창을 만든다

필요한것은 email입력 inpuit창, password 입력 input창, form을 submit할 버튼, 구글로 로그인할 버튼, 깃헙으로 로그인할 버튼, 오류시 어떤오류일지 알려주는 창(선택), 로그인과 가입창으로 바꿔주는 버튼이 필요한다

**기본 JSX**

email password를 변환하고 사용하기 위해 useState를 두개 만든다

```react
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
 //아래 return은 최종본이므로 참고만 할것
return (
    <div>
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    name="email"
                    value={email}
                    type="text"
                    placeholder="email"
                    required
                    />
                <input
                    onChange={onChange}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="password"
                    required
                    />
                <input type="submit" value={newAccount ? "Create" : "Login"}></input>
            </form>
            <span>{error}</span>
        </div>
        <span onClick={toggleAccount}>
            {newAccount ? "Login" : "Create Account"}
        </span>
        <div>
            <button onClick={socalLogin} name="google">
                Continue with Google
            </button>
            <button onClick={socalLogin} name="github">
                Continue with Github
            </button>
        </div>
    </div>
);
```

그냥 이렇게만 놓으면 입력을해도 input창이 바뀌지 않는다 그래서 onChnage함수를 만들어 입력값을 각각의 state에 저장해 둘것이다 항상 해왔던 방식이다 대신 이번에는 onChange를 하나로 쓰기위해서 name이라는 고유 값을 설정하고 이를 이용해서 저장을 하였다

```react
const onChange = (event) => {
    if (event.target.name === "email") {
        setEmail(event.target.value);
    } else {
        setPassword(event.target.value);
    }
};
```

**로그인 가입 선택버튼**

다음으로 할 것은 로그인과 가입창을 전환하도록 하는것이다 이를 위해서 가입창으로 할것인지 로그인창으로 할것인지 선택하게 할 state가 하나 필요하다

```react
const [newAccount, setNewAccount] = useState(true);
```

또한 이 state가 버튼 클릭시에 true 또는 false로 switching되게끔 사용한다

```react
const toggleAccount = () => {
    setNewAccount((pre) => !pre);
};
```

이제 jsx에 onClick값을 toggleAccount로 주면서 switching되도록 하고 이값에 따라 보여주는 text가 달라지도록 사용한다

```react
                <input type="submit" value={newAccount ? "Create" : "Login"}></input>
            </form>
            <span>{error}</span>
        </div>
        <span onClick={toggleAccount}>
            {newAccount ? "Login" : "Create Account"}
        </span>
//위에 이부분이다.
```

**email 가입방법**

input창에 입력을했을때 state에 update까지 끝냈으면 이 state를 가지고 가입이나 로그인을 해야한다 다행이도 firebase는 이를 지원해주어 편하게 코드를 짤수 있다 

- [signInWithEmailAndPassword](https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword)

```react
const [error, setError] = useState("");
const onSubmit = async (event) => {//async await는 공부해보자
    event.preventDefault();
    let data; //어떤값이 오는지 보려고 만든것임 굳이 필요없음
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
```

submit을 하였을때 작동을 하도록 onSubmit을 만들고 가입을 해줄것이다 firebase에서 기본으로 세팅해준 firebase.auth를 가지고 authService로 import한것이다 위에서 우리가 가입창으로 할것인지 로그인창으로 할것인지 선택을 하였다 만약에 가입창이면 이 authService는 가입request를 보내고 로그인창이면 로그인 request를 보내게 만들었다 함수는 firebase 기본문서에 적혀있다 그리고 catch를 이용해서 error가 무엇인지 찍어내도록 하였다

**Socal Log in**

구글과 깃허브 가입도 해보겠다 

- [signInWithPopup](https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithpopup)
- [signInWithRedirect](https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithredirect)

두가지 방법이 있지만 popup으로 사용하겠다

※ 사용하기전에 firebase를 export시켜야한다 fbase.js파일에서 `export const firebaseInstance = firebase;` 한줄을 추가하자

```react
  const socalLogin = async (event) => {
    let provider;
    const {
      target: { name },
    } = event; //es6방법임 자세한건 강의를 들어봐야함
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  };
```

각각의 버튼에 name에 고유값을 주어서 클릭되었을때 이 값을 이용해서 어떤가입을 눌렀는지 판단할것이다 firebase.auth에 있는 GoogleAuthProvider와 GithubAuthProvider를 이용해서 provider를 받고 `authService.signInWithPopup(provider)`에 넘겨주어 로그인을 하게 할 것이다.

**동작 변화 감지하기**

이렇게 하면 문제가 생긴다 로그인을 시도해도 app.js에 있는 IsLoggedIn state가 그대로 false가 되는 것이다 이유는 firebase가 초기화가되고 업데이트가 되기전에 모든 코드가 종료되었기때문에 react에서는 이를 감지하지 못한 것이다 따라서 초기화가 끝난후에 코드를 실행시켜 주어야한다 

- [onAuthStateChanged](https://firebase.google.com/docs/reference/js/auth.auth.md?hl=ko#authonauthstatechanged)

firebase의 로그인상태를 감지하는 관찰자이다 이를 통해 초기화가 끝나고 로그인여부 판단 및 초기화 여부를 저장해 줄것이다 초기화가 완료되어야 Router를 띄워준다

```react
//App.js
const [init, setInit] = useState(false); //초기화가 되었는지 체크
//시작될때 한번만 필요하다
useEffect(() => {
    authService.onAuthStateChanged((user) => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setInit(true);
    });
}, []);
return (
    <>
    {init ? <AppRouter IsLoggedIn={IsLoggedIn} /> : "Initialized"}
    <footer>&copy; {new Date().getFullYear()}</footer> //footer나 navigator를 추가하기 위해서 router말고 app.js파일을 만들어서 3등분으로 분리할 수 있게끔 하였다
</>
);
```

**Profile 창에서 로그아웃 버튼 만들기**

로그인을 하였으니 로그아웃을 만들어야한다 Profile창에서 이를 구현할 것이다 이를위해 Router를 수정한다

```react
//Router.js
<Routes>
    {IsLoggedIn ? (
        <>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        </>
    ) : (
        <Route exact path="/" element={<Auth />}></Route>
    )}
</Routes>
```

로그인이 되었을때 들어갈 수 있도록하고 경로를 /profile로 설정한다

```react
//profile.js
const Profile = () => {
  const logOutClick = () => {
    authService.signOut();
  };
  return (
    <>
      <button onClick={logOutClick}>
        <Link to="/">Log Out</Link> 
      </button>
    </>
  );
};
```

로그아웃 방법은 간단하다 singOut() method를 호출하기만 하면된다 로그아웃시에 Home화면으로 돌아가기위해 Link를 넣는다

**Navigator만들기**

profile창 Home화면을 왔다갔다할 navigator를 만들것이다 

```react
// Router.js
<Router>
      {IsLoggedIn && <Navigator />} 
      <Routes>
```

로그인시 navigator가 보일수 있게 추가해 준다

```react
import React from "react";
import { Link } from "react-router-dom";

const Navigator = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">My ProFile</Link>
        </li>
      </ul>
    </>
  );
};

export default Navigator;

```

Link를 이용해서 클릭시 이동하게 한다

## 트윗 만들기

**트윗 DB작성**

트윗 작업을 하기위해서는 먼저 Home화면에 기본적인 세팅과 CloneTweet이라는 component를 만들어 줄것이다

```react
//Home.js
const [clonetweet, setClonetweet] = useState("");
//....중략.....
return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={clonetweet}
          type="text"
          placeholder="What is your mind"
          maxLength={120}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
```

트윗을 작성할수 있는 창과 submit을 할 수 있는 버튼을 생성한다 위와마찬가지로 onChange 로 state에 변경값을 저장한다 

onSubmit은 form을 제출하였을때 이값이 db로 넘어가야한다

```react
const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection("cloneTweet").add({
        text: clonetweet, //트윗내용
        createAt: Date.now(), //생성날짜
        user: userObj.uid, //유저 고유값 로그인유저가 저장된 값이랑 같으면 수정이나 삭제를 할수 있음
    });
    setClonetweet("");// 트윗input의 값이 사라져야함
};
```

`dbService.collection("cloneTweet")`으로 collection을 지정해주고 거기에 add를 사용하여 데이터를 저장한다

**트윗 DB에서 읽어오기**

데이터 베이스에 있는 트윗들을 가져와야한다 이에 2가지 방법을 사용할 것인데 이중에서 두번째 방법을 더 선호한다

1. forEach 사용하기

   ```react
   const getClonetweets = async () => {
       const dbtweets = await dbService.collection("cloneTweet").get();
       dbtweets.forEach((document) => {
           const clonetwwetObj = {
               ...document.data(), //데이터를 모두가져오고
               id: document.id, //id를 추가함
           };
           setClonetweets((pre) => [clonetwwetObj, ...pre]);
       });
   }; //이건 계속 re-rendering이 일어남
   ```

   Collection경로로 읽어와 get을해서 객체를 얻어온다 그리고 이객체를 forEach를 이용해서 하나의 트윗 obj로 변경해서 state에 저장한다 처음 시작시에 useEffect를 이용해서 getClonetweets를 호출하면 호출마다 데이터를 가져와 보여준다

2. onSnapshot 사용하기

   ```react
   useEffect(() => {
       dbService
         .collection("cloneTweet")
         .orderBy("createAt", "desc") //시간순 정렬
         .onSnapshot((snapshot) => {
           const dbtweet = snapshot.docs.map((doc) => ({
             id: doc.id, //id를 추가
             ...doc.data(), //데이터를 모두가져옴
           }));
           setClonetweets(dbtweet);
         });
     }, []);
   ```

   onSnapshot 이라는 데이터베이스의 감지를 체크하는 eventListener같은 함수를 사용한다 이를 이용해 똑같이 데이터를 추출해 오는데 get함수가 아닌 argument로 함수를 넣어주어서 가져와 state에 저장한다

두가지 방법이 있지만 밑에 방법은 rendring이 단한번만 일어나기 때문에 랜더링을 줄일 수 있다

트윗을 읽어왔으니 트윗을 띄워줄 component를 하나 생성한다 (CloneTweet) 그리고 Home화면에 연결한다

```react
<div>
    {clonetweets.map((clonetweet) => (
        <CloneTweet
            clonetweet={clonetweet}
            isOwner={clonetweet.user === userObj.uid}
            key={clonetweet.id}
            />
    ))}
</div>
```

받아온 트윗들은 모두 객체로 되어있기 때문에 map을 이용해서 컴포넌트를 하나씩 만들 것이다. 이때 prop로 트윗내용과 이 트윗이 로그인된 사람것이지를 알려주는 boolean 을 넘겨줄 것이다.

```react
return (
    <div key={key}>
            <h4>{clonetweet.text}</h4>
            {isOwner && (
            <>
            <button onClick={deleteTweet}>Delete tweet</button>
            <button onClick={toggleEditMode}>Edit tweet</button> //toggleEditMode는 조금이따가 설명
            </>
        )}
    </div>
);
```

트윗을 보여주고 트윗이 자신것이면 버튼을 보여주게 하였다

**트윗 삭제하기**

```react
  const deleteTweet = () => {
    const ok = window.confirm("Are you sure delete this?");
    if (ok) {
      dbService.doc(`cloneTweet/${clonetweet.id}`).delete();
    }
  };
```

Delete 버튼을 눌렀을떄 실행되는 함수이다 confirm을 이용해서 한번더 물어보고 확인을 누르면 doc의 경로를 지정해서 삭제한다 이때 우리가 지정해놓은 id로 이용한다

**트윗 수정하기**

트윗을 수정하려면 먼저 2개의 state를 만들어야한다 바로 edit모드가 켜졌는지 확인할 boolean과 수정된 내용을 저장할 state가 필요하다

```react
const [editMode, setEditMode] = useState(false);
const [editTweet, setEditTweet] = useState(clonetweet.text);
const toggleEditMode = () => {
    setEditMode((pre) => !pre);
};
```

toogleEditMode는 버튼을 누를때마다 eidtMode의 state를 반대로 설정한다 

```react
<div key={key}>
      {editMode ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} value={editTweet}></input>
            <input type="submit"></input>
          </form>
        </>
      ) : (
        <>
          <h4>{clonetweet.text}</h4>
          {isOwner && (
            <>
              <button onClick={deleteTweet}>Delete tweet</button>
              <button onClick={toggleEditMode}>Edit tweet</button>
            </>
          )}
        </>
      )}
    </div>
```

수정에 필요한 input창들을 넣고 mode가 true가 되면 수정창이 보이고 false이면 트윗과 삭제 수정버튼이 보이도록 한다 마찬가지로 onChange함수를 만들어서 editTweet을 설정한다

```react
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`cloneTweet/${clonetweet.id}`).update({ text: editTweet });
    toggleEditMode();
  };
```

수정하는 방법은 간단하다 삭제와 마찬가지로 doc으로 경로를 지정해주고 update함수로 update해주면 된다 그리고 editmode를 false로 변경한다.

## 파일 업로드하기

**파일 읽어들이기**

파일을 업로드 하기 위해서 file업로드에 필요한 input창을 생성한다 이미지만 허용하기위해 accept를 image로 사용하였다

```react
const fileref = useRef();
..중략..
<input
    ref={fileref}
    type="file"
    accept="image/*"
    onChange={onFileChange}
    ></input>
```

이제 파일을 선택할 수 있는데 이 사진이 선택되면 url로 만들어 데이터 베이스에 저장해 줄것이다

```react
const [img, setImg] = useState();
const onFileChange = (event) => {
    const {
        target: { files },
    } = event;
    const theFile = files[0];//arr로 반환되었음
    const reader = new FileReader();
    reader.onloadend = (finished) => { //loading이 끝나야 실행
        const {
            currentTarget: { result },
        } = finished;
        setImg(result); //파일의 인코딩(?)된 데이터 문자열을 저장한다
    };
    reader.readAsDataURL(theFile); //url로 변환한다. 
};
```

처음보는 함수들이 많아졌다 

- [FileReader](https://developer.mozilla.org/ko/docs/Web/API/FileReader)
- [readAsDataURL](https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsDataURL) 

file 입력과 관련된 함수들이다. 파일이 선택되면 이 함수들을 이용해서 데이터베이스에 쓸 준비를 한다.  `reader.readAsDataURL(theFile);` 가 실행이되어야 reader.onloadend가 실행이 된다 파일을 올렸을때 남은것이 사진을 문자열로 변환된것이다(Img state)

**파일 업로드하기**

파일을 읽었으니 sumit을 통해서 데이터베이스에 저장해 줄 차례이다 기존의 submit을 

```react
const onSubmit = async (event) => {
    event.preventDefault();
    let imgUrl = "";
    if (img) {
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRef.putString(img, "data_url");
        console.log(await response.ref.getDownloadURL()); //요 3줄 이해하기 참힘들었따...
        imgUrl = await response.ref.getDownloadURL(); //https://firebase.google.com/docs/storage/web/download-files?authuser=0
    }
    const clonetweetObj = {
        text: clonetweet,
        createAt: Date.now(),
        user: userObj.uid,
        imgUrl,
    };
    dbService.collection("cloneTweet").add(clonetweetObj);
    setClonetweet("");
    setImg("");
};
```



#### 깃허브 로그인

