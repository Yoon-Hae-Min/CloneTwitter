import AppRouter from "components/Router";
import { authService } from "fbase";
import { useState, useEffect } from "react";

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter IsLoggedIn={IsLoggedIn} /> : "Initialized"}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
