import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import GameGrid from "./components/GameGrid";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import CreatePage from "./pages/CreatePage";
import StadiumPage from "./pages/StadiumPage";


function App() {
  return (
    <BrowserRouter basename="/">
      <div>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
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
      </Switch>
    {/* <GameGrid /> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
