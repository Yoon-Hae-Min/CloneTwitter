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
