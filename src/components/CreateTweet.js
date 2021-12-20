import { dbService, storageService } from "fbase";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "../css/CreateTweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CreateTweet = ({ userObj }) => {
  const [clonetweet, setClonetweet] = useState("");
  const [img, setImg] = useState(null);
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
    // 파이어베이스때문에 vpn키고 작업을 해야지 이미지가 보임 한국에만 있는 ISP이슈였음 그날 파이어 베이스 사용자들 다 그랬는듯
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
    <form onSubmit={onSubmit} className={style.createTweet}>
      <div className={style.textInputs}>
        <input
          className={style.tweetInput}
          onChange={onChange}
          value={clonetweet}
          type="text"
          placeholder="What is your mind"
          maxLength={120}
        ></input>
        <input className={style.postTweetInput} type="submit" value="→"></input>
      </div>
      <label htmlFor="fileSelectInput" className={style.addPhotoBtn}>
        <span>Add Photos </span>
        <FontAwesomeIcon icon={faPlus} color="white" />
      </label>
      <input
        id="fileSelectInput"
        ref={fileref}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className={style.fileSelectInput}
        style={{ opacity: 0 }}
      ></input>
      {img && (
        <div className={style.attachmentPhoto}>
          <img src={img} className={style.previewImg} />
          <button onClick={deleteImg} className={style.deletePhotoBtn}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default CreateTweet;
