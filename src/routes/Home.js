import CloneTweet from "components/CloneTweet";
import { dbService } from "fbase";
import react, { useState, useEffect } from "react";

const Home = ({ userObj }) => {
  const [clonetweet, setClonetweet] = useState("");
  const [clonetweets, setClonetweets] = useState([]);
  const getClonetweets = async () => {
    const dbtweets = await dbService.collection("cloneTweet").get();
    dbtweets.forEach((document) => {
      const clonetwwetObj = {
        ...document.data(),
        id: document.id,
      };
      setClonetweets((pre) => [clonetwwetObj, ...pre]);
    });
  }; //이건 계속 re-rendering이 일어남

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
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection("cloneTweet").add({
      text: clonetweet,
      createAt: Date.now(),
      user: userObj.uid,
    });
    setClonetweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setClonetweet(value);
  };
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
