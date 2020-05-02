import React, { Component } from "react";
import PuzzleLogic from "../components/PuzzleLogic";
import { Redirect } from 'react-router-dom';
import AuthContext from "../utils/AuthContext";
import ChooseMap from "../components/ChooseMap";
import Axios from "axios";
import "./style.css";
import DDLogo from "../assets/DDlogo.png";
import Image from 'react-bootstrap/Image';



class PlayPage extends Component {

    constructor(props) {
        // necessary line 
        super(props);
        // Don't call this.setState() here!

        this.state = {
            isMapChosen: false,
            typeMapChosen: "",
            mapChosen: [],
        };

        // this.setState = this.setState.bind(this);
    }



    // Choose type of map to display
    setMapType = (props) => {
        let typeMapClicked = props;

        this.setState({
            typeMapChosen: typeMapClicked
        })
    }

    componentDidUpdate() {

        if (this.state.typeMapChosen === "random" && this.state.isMapChosen === false) {
            //make random axios call
            Axios.post("/api/dungeons/randomMap", {
                params: {
                }
            }).then((response) => {
                // handle success
                console.log("+++++++++ axios response: ", response);
                this.setState({
                    mapChosen: response.data,
                    isMapChosen: true
                })
            })
                .catch((error) => {
                    // handle error
                    console.log(error);
                });
            // .then(function () {
            //     // always executed
            // });
        }
    }




    // This will conditionally render components based on state 
    renderPage = () => {
        console.log("state in renderPage: ", this.state);
        if (this.state.isMapChosen === true) {
            return <PuzzleLogic dungeonMap={JSON.parse(this.state.mapChosen[0].dungeonMap)} />
        } else if (this.state.typeMapChosen === "") {
            return <ChooseMap setMapType={this.setMapType} />
        } else if (this.state.typeMapChosen === "friends" && this.state.mapChosenString === "") {
            return <friendsMaps />
        } else if (this.state.typeMapChosen === "difficulty" && this.state.mapChosenString === "") {
            return <difficultyMap />
        } else if (this.state.typeMapChosen === "previous" && this.state.mapChosenString === "") {
            return <previousMaps />
        }

    }


    render() {
        return (

            <div className="home-center">
                
                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <div className="centre">
                <Image img src={DDLogo} alt="DungeonDash" fluid/>
                </div>
               
                {this.renderPage()}
            </div>
        )
    }
}
PlayPage.contextType = AuthContext;
export default PlayPage;