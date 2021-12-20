import { useRef, useState } from "react";
import { authService, storageService } from "fbase";
import { Link } from "react-router-dom";
import style from "../css/ProFile.module.css";

const Profile = ({ refreshUser, userObj }) => {
  const [profileName, setProfileName] = useState(userObj.displayName);
  const [updateUserImg, setUpdateUserImg] = useState(null);
  const logOutClick = () => {
    authService.signOut();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setProfileName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== profileName) {
      await userObj.updateProfile({
        displayName: profileName,
      });
      refreshUser();
    }
    if (updateUserImg) {
      const attachmentRef = storageService
        .ref()
        .child(`userPhoto/${userObj.uid}`);
      const response = await attachmentRef.putString(updateUserImg, "data_url");

      const UserImgUrl = await response.ref.getDownloadURL();
      await userObj.updateProfile({
        photoURL: UserImgUrl,
      });
      setUpdateUserImg(null);
      fileRef.current.value = null;
      refreshUser();
    }
  };
  const onImgChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const fileReader = new FileReader();

    fileReader.onload = (finished) => {
      const {
        currentTarget: { result },
      } = finished;

      setUpdateUserImg(result);
    };
    fileReader.readAsDataURL(theFile);
  };
  const deleteImg = () => {
    imgRef.current.value = null;
    setUpdateUserImg(null);
  };
  const imgRef = useRef();
  const fileRef = useRef();
  return (
    <div className={style.container}>
      <form onSubmit={onSubmit} className={style.updateProFile}>
        <input
          className={style.updateNameInput}
          placeholder="Change Profile Name"
          type="text"
          value={profileName}
          onChange={onChange}
        ></input>
        <label>
          <span htmlFor="ChangeProFileImg"> Change Profile Image</span>
          <input
            id="ChangeProFileImg"
            type="file"
            accept="image/*"
            onChange={onImgChange}
            ref={fileRef}
            style={{ opacity: 0 }}
          ></input>
        </label>
        {updateUserImg && (
          <>
            <img
              src={updateUserImg}
              ref={imgRef}
              alt="미리보기를 불러올수 없습니다"
            />
            <input
              onClick={deleteImg}
              className={style.logoutBtn}
              value="Clear"
            />
          </>
        )}
        <input
          type="submit"
          value="Update Profile"
          className={style.postUpdateProFile}
        ></input>
      </form>
      <button
        onClick={logOutClick}
        className={style.logoutBtn}
        style={{ marginTop: "100px" }}
      >
        <Link to="/" style={{ color: "white" }}>
          Log Out
        </Link>
      </button>
    </div>
  );
};

export default Profile;
