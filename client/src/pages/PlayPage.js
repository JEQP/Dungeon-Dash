import React, { Component } from "react";
import PuzzleLogic from "../components/PuzzleLogic";
import { Redirect } from 'react-router-dom';
import AuthContext from "../utils/AuthContext";


class PlayPage extends Component {

    render() {
        return (

            <div>
                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <h1>This is the Playpage</h1>
                <PuzzleLogic />
            </div>
        )
    }
}
PlayPage.contextType = AuthContext;
export default PlayPage;