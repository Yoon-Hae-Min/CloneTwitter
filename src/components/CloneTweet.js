import { dbService, storageService } from "fbase";
import { useState } from "react";
import style from "../css/CloneTweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const CloneTweet = ({ clonetweet, isOwner }) => {
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
    <div className={style.tweets}>
      {editMode ? (
        <div>
          <form onSubmit={onSubmit} className={style.editTweet}>
            <input
              type="text"
              onChange={onChange}
              value={editTweet}
              className={style.tweets}
            ></input>
            <input
              type="submit"
              value="Update"
              className={style.updateTweetBtn}
            ></input>
            <button onClick={toggleEditMode} className={style.deleteTweetBtn}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <>
          {isOwner && (
            <div className={style.tweetAction}>
              <span onClick={deleteTweet}>
                <FontAwesomeIcon icon={faTrashAlt} color="black" />
              </span>
              <span onClick={toggleEditMode}>
                <FontAwesomeIcon icon={faEdit} color="black" />
              </span>
            </div>
          )}
          <h4>{clonetweet.text}</h4>
          {clonetweet.imgUrl && (
            <img
              src={clonetweet.imgUrl}
              alt="트윗의 이미지를 불러올수 없습니다"
            ></img>
          )}
        </>
      )}
    </div>
  );
};

export default CloneTweet;
