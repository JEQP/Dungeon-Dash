import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import GameGrid from "./components/GameGrid";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import CreatePage from "./pages/CreatePage";
import StadiumPage from "./pages/StadiumPage";
import AuthContext from "./utils/AuthContext";
import Credits from "./components/auth/Credits";
import { Redirect } from 'react-router-dom';


function App() {

  const [authState, setAuthState] = useState({
    email: "",
    isAuthenticated: false,

    changeAuthentication: (isAuthenticated, email) => {
      setAuthState({
        ...authState,
        isAuthenticated: isAuthenticated,
        email: email
      })
    }
  });

  return (

    <AuthContext.Provider value={authState}>
      <BrowserRouter basename="/">
        <div>
          { // check whether user is authenticated
          authState.isAuthenticated === false &&
            <Redirect to='/login' />
          }

          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/play">
              <PlayPage />
            </Route>
            <Route exact path="/create">
              <CreatePage />
            </Route>
            <Route exact path="/stadium">
              <StadiumPage />
            </Route>
            <Route exact path="/credits">
              <Credits />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


export default App;
