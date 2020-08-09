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
import SizeContext from "./utils/SizeContext";
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

  // Set context provider for size
  const [sizeState, setSizeState] = useState({
    matches: "",

    changeSize: (matches) => {
      setSizeState({
        ...sizeState,
        matches: matches
      })
    }
  });

  


// this useEffect is not changing the context. It's trying to change the context provider, but that's not how context is changed.
// login.js has the following code for changing authentication context - adapt this to this useEffect hook. May have to put the following
//  code in the context consumer functions, not sure we can put it here. 

// // to change authentication state
// this.setState({ isAuthenticated: true });
// let localStorageJSON = { "isAuthenticated": this.state.isAuthenticated, "email": this.state.email };
// let localStorageString = JSON.stringify(localStorageJSON);
// localStorage.setItem("dungeondashuser", localStorageString);
// let value = this.context;
// value.changeAuthentication(this.state.isAuthenticated, this.state.email);
// console.log("value: ", value);
// }

useEffect(() => {
  let screen = window.matchMedia("(min-width: 768px)").matches;
  setSizeState({matches: screen});
}, []);

  useEffect(() => {
    const handler = e => setSizeState({matches: e.matches}); 
    window.matchMedia("(min-width: 768px)").addListener(handler);
  }, [sizeState.matches]);

  return (

    <AuthContext.Provider value={authState}>
      <SizeContext.Provider value={sizeState}>
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
              <Route path="/play/:id" component={PlayPage} />
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
      </SizeContext.Provider>
    </AuthContext.Provider>
  );
}


export default App;
