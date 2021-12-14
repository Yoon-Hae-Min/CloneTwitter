import CloneTweet from "components/CloneTweet";
import { dbService, storageService } from "fbase";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [clonetweet, setClonetweet] = useState("");
  const [clonetweets, setClonetweets] = useState([]);
  const [img, setImg] = useState();
  // const getClonetweets = async () => {
  //   const dbtweets = await dbService.collection("cloneTweet").get();
  //   dbtweets.forEach((document) => {
  //     const clonetwwetObj = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setClonetweets((pre) => [clonetwwetObj, ...pre]);
  //   });
  // }; //이건 계속 re-rendering이 일어남

  useEffect(() => {
    //getClonetweets();
    dbService
      .collection("cloneTweet")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const dbtweet = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClonetweets(dbtweet);
      });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    let imgUrl = "";
    if (img) {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(img, "data_url");
      imgUrl = await response.ref.getDownloadURL();
    }
    // https://firebase.google.com/docs/storage/web/download-files?authuser=0)
    // 파이어베이스때문에 vpn키고 작업을 해야지 이미지가 보임
    const clonetweetObj = {
      text: clonetweet,
      createAt: Date.now(),
      user: userObj.uid,
      imgUrl,
    };
    dbService.collection("cloneTweet").add(clonetweetObj);
    setClonetweet("");
    setImg("");
    fileref.current.value = null;
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setClonetweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finished) => {
      const {
        currentTarget: { result },
      } = finished;
      setImg(result);
    };
    reader.readAsDataURL(theFile);
  };
  const deleteImg = () => {
    setImg(null);
    fileref.current.value = null;
  };
  const fileref = useRef();
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
        <input
          ref={fileref}
          type="file"
          accept="image/*"
          onChange={onFileChange}
        ></input>
        {img && (
          <>
            <img src={img} width="40px" />
            <button onClick={deleteImg}>Clear</button>
          </>
        )}
        <input type="submit"></input>
      </form>
      <div>
        {clonetweets.map((clonetweet) => (
          <CloneTweet
            clonetweet={clonetweet}
            isOwner={clonetweet.user === userObj.uid}
            key={clonetweet.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
