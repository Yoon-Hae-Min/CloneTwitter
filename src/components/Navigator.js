import React from "react";
import { Link } from "react-router-dom";
import style from "../css/Navigator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Navigator = ({ userObj }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.titleItem}>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} size="6x" color="skyblue" />
            <p className={style.textColor}>Home</p>
          </Link>
        </div>
        <div className={style.titleItem}>
          {userObj && (
            <Link to="/profile">
              <img
                className={style.proFileImg}
                src={userObj.photoURL}
                alt="사용자의 사진을 불러올수 없습니다"
              />
              <p className={style.textColor}>{userObj.displayName}의 ProFile</p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigator;
