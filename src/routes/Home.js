import CloneTweet from "components/CloneTweet";
import CreateTweet from "components/CreateTweet";
import { dbService } from "fbase";
import { useState, useEffect } from "react";
import style from "../css/Home.module.css";

const Home = ({ userObj }) => {
  const [clonetweets, setClonetweets] = useState([]);
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

  return (
    <div className={style.container}>
      <CreateTweet userObj={userObj} />
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
