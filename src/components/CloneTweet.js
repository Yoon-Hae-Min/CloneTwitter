import { dbService, storageService } from "fbase";
import { useState } from "react";

const CloneTweet = ({ clonetweet, isOwner, key }) => {
  const [editMode, setEditMode] = useState(false);
  const [editTweet, setEditTweet] = useState(clonetweet.text);
  const deleteTweet = () => {
    const ok = window.confirm("Are you sure delete this?");
    if (ok) {
      dbService.doc(`cloneTweet/${clonetweet.id}`).delete();
      storageService.refFromURL(clonetweet.imgUrl).delete();
    }
  };

  const toggleEditMode = () => {
    setEditMode((pre) => !pre);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setEditTweet(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`cloneTweet/${clonetweet.id}`).update({ text: editTweet });
    toggleEditMode();
  };
  return (
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
          {clonetweet.imgUrl && <img src={clonetweet.imgUrl}></img>}

          {isOwner && (
            <>
              <button onClick={deleteTweet}>Delete tweet</button>
              <button onClick={toggleEditMode}>Edit tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CloneTweet;
