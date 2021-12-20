import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
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
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <AuthForm />
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
