import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //useeffect(1=>'if dependency change this annonymous fn will called happend',2'dependencies if this changed
  //then our function will be called')
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("isLoggedIn");
    if (storedUserInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);//in this useeffect this will run only once 
  //if we will not take 2nd argument of usefeect it will run when any thing is changed or pdated

  const loginHandler = (email, password) => {
    
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
