import React, { Component } from "react";
import AuthContext from "../utils/AuthContext";
import { Redirect } from 'react-router-dom';
import GameGrid from "../components/GameGrid";


class CreatePage extends Component {


    render() {
        return (
            <div>
                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <h1>This is the Createpage</h1>
                <GameGrid />
            </div>
        )
    }
}
CreatePage.contextType = AuthContext;
export default CreatePage;