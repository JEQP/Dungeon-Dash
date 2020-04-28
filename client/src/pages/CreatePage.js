import React, { Component } from "react";
import AuthContext from "../utils/AuthContext";
import { Redirect } from 'react-router-dom';
import CreatePuzzleLogic from "../components/CreatePuzzleLogic";
import Axios from "axios";


class CreatePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            map: "",
            verified: false,
            title: "",
            creator: "5ea6c088da41ae8738777057",
            stats: [1,1]
        }
    }
static contextType = AuthContext

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        if (name === "title") {
          value = value.substring(0, 100);
        }
        // Updating the input's state
        this.setState({
          [name]: value
        });
      };

      componentDidMount(){
          const user = this.context
          console.log("user context: ", user);
          // do an axios call for the e-mail of the authenticated user
          // get _id from there
          // set creator as _id
          console.log("authContext: ", AuthContext);
          console.log("email: ", AuthContext.email);

      }

    stringifyDungeonMap = (props) => {
        // console.log("props in stringifyDungeonMap: ", props);
        this.setState({
            map: props
        });

        Axios.post('/api/dungeons/create', {
            map: props,
            verified: this.state.verified,
            title: this.state.title,
            creator: this.state.creator,
            stats: this.state.stats
        })
            .then((response) => {
                if (response.data.success === true) {
                    console.log("dungeon saved", this);
                    // to change authentication state
                    
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <h1>This is the Createpage</h1>
                <form className="form">
                    <input
                        value={this.state.title}
                        name="title"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Name of Dungeon"
                    />
                    </form>
                    <CreatePuzzleLogic
                        stringifyDungeonMap={this.stringifyDungeonMap}
                    />
            </div>
        )
    }
}
CreatePage.contextType = AuthContext;
export default CreatePage;