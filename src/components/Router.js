import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigator from "components/Navigator";
import style from "../css/Router.module.css";
const AppRouter = ({ refreshUser, IsLoggedIn, userObj }) => {
  return (
    <Router>
      <div className={style.container}>
        {IsLoggedIn && <Navigator userObj={userObj} />}
        <Routes>
          {IsLoggedIn ? (
            <>
              <Route
                exact
                path="/"
                element={<Home userObj={userObj} />}
              ></Route>
              <Route
                exact
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              ></Route>
            </>
          ) : (
            <Route exact path="/" element={<Auth />}></Route>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
