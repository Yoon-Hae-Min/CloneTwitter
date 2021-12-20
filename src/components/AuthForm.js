import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
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
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
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
    </>
  );
};

export default AuthForm;
