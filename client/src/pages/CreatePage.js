import React, { Component } from "react";
import AuthContext from "../utils/AuthContext";
import { Redirect } from 'react-router-dom';
import CreatePuzzleLogic from "../components/CreatePuzzleLogic";


class CreatePage extends Component {


    render() {
        return (
            <div>
                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <h1>This is the Createpage</h1>
                <CreatePuzzleLogic />
            </div>
        )
    }
}
CreatePage.contextType = AuthContext;
export default CreatePage;