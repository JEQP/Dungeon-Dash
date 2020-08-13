import React, { Component } from "react";
import AuthContext from "../utils/AuthContext";
import { Redirect } from 'react-router-dom';
import CreatePuzzleLogic from "../components/CreatePuzzleLogic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from 'react-bootstrap/Image';
import Axios from "axios";
import DDlogo from "../assets/DDlogo.png";
import Logout from "../components/Logout";

class CreatePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dungeonMap: "",
            verified: false,
            title: "",
            creator: "5ea6c088da41ae8738777057",
            stats: [1, 1],
            mapSaved: false
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

    componentDidMount() {
        if (this.state.creator === "") {
            const user = this.context

            Axios.post("/api/users/getUserID", {
                email: user.email
            }).then((response) => {
                // console.log("response from getUserID", response.data._id);
                this.setState({
                    creator: response.data._id
                });
            }).catch(err => console.log(err));
        }
    }

    // This saves the dungeon map to the database. The onClick method to use this method only appears after the map is successfully completed.
    // Future adjustment: Change state.verified when the map is completed in createMapLogic. 
    stringifyDungeonMap = (props) => {
        
        this.setState({
            dungeonMap: props,
            verified: true,
            mapSaved: true
        });

        Axios.post('/api/dungeons/create', {
            dungeonMap: props,
            verified: true,
            title: this.state.title,
            creator: this.state.creator,
            stats: this.state.stats
        })
            .then((response) => {
                if (response.data.success === true) {
                    // console.log("dungeon saved", this);
                    // to change authentication state
                }
                console.log(response);     
            })
            .catch(function (error) {
                console.log(error);
            });
            // REDIRECT To A PAGE 
            
    }

    render() {
        return (
            <div>
                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                {
                    this.state.mapSaved === true &&
                    <Redirect to='/stadium' />
                }
                <div className="home-page">
                <Logout />
                    <Image img src={DDlogo} alt="DungeonDash" fluid />
                    <Navbar />
                    <form className="form title">
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
                        title={this.state.title}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}
CreatePage.contextType = AuthContext;
export default CreatePage;