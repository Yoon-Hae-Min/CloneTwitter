import react from "react";
import { authService } from "fbase";
import { Link } from "react-router-dom";

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

export default Profile;
