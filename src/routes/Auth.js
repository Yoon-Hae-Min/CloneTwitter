import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const toggleAccount = () => {
    setNewAccount((pre) => !pre);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const socalLogin = async (event) => {
    let provider;
    const {
      target: { name },
    } = event;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            name="email"
            value={email}
            type="text"
            placeholder="email"
            required
          />
          <input
            onChange={onChange}
            value={password}
            name="password"
            type="password"
            placeholder="password"
            required
          />
          <input type="submit" value={newAccount ? "Create" : "Login"}></input>
        </form>
        <span>{error}</span>
      </div>
      <span onClick={toggleAccount}>
        {newAccount ? "Login" : "Create Account"}
      </span>
      <div>
        <button onClick={socalLogin} name="google">
          Continue with Google
        </button>
        <button onClick={socalLogin} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
