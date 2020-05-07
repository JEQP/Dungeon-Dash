import React, { Component } from "react";
import AuthContext from "../utils/AuthContext";
import Axios from "axios";
import DDLogo from "../assets/DDlogo.png";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./style.css";

class StadiumPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            friends: [],
            dungeonsPlayed: [],
            results: [],
            dungeons: [],
            _id: "",
            friendSearchName: "",
            friendSearchEmail: "",
            dungeonListCreator: "",
            dungeonList: []
        }
    }

    componentDidMount() {

        const user = this.context
        console.log("user context: ", user);
        console.log("authContext: ", AuthContext);
        console.log("===user.email====", user.email);
        Axios.post("/api/users/getUserID", {
            email: user.email
        }).then((response) => {
            console.log("response from getUserID", response.data);
            this.setState({
                name: response.data.name,
                email: response.data.email,
                friends: response.data.friends,
                dungeonsPlayed: response.data.dungeonsPlayed,
                results: response.data.results,
                dungeons: response.data.dungeons,
                _id: response.data._id,
                dungeonListCreator: response.data._id

            });
        }).catch(err => console.log(err));

    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("this state dlc: ", this.state.dungeonListCreator);
        // console.log("prevState DLC: ", prevState.dungeonListCreator);
        // console.log("prevState alone ", prevState);
        // This updates the list of dungeons based on the creator. 
        // It checks the state had changed to avoid an infinite loop.
        if ((this.state.dungeonListCreator !== prevState.dungeonListCreator) && this.state.dungeonListCreator.length > 1) {

            Axios.post("api/dungeons/getDungeons", {
                params: {
                    friendID: this.state.dungeonListCreator
                }
            }).then((response) => {
                console.log("renderDungeonListCreator: ", response.data);
                this.setState({ dungeonList: response.data })
            });

        }
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        if (name === "friendSearchName" || name === "friendSearchEmail") {
            value = value.substring(0, 100);
        }
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    // This will search the database for a document that matches the name.
    // It will push the id and name of the friend to this.state.friends
    // A further axios call updates the database with state.friends

    getFriendByName = () => {

        Axios.post("/api/users/getFriendByName", {
            name: this.state.friendSearchName
        }).then((response) => {
            console.log("response from getFriendByName", response.data);
            let tempFriendToAdd = { friend_id: response.data._id, friend_name: response.data.name };
            let tempFriendArray = this.state.friends;
            tempFriendArray.push(tempFriendToAdd);
            console.log("tempFriendToAdd: ", tempFriendToAdd)
            this.setState({
                friends: tempFriendArray
            });
        }).catch(err => console.log(err))
            .then(() => {
                Axios.post("/api/users/updatePlayerFriendList", {
                    params: {
                        playerID: this.state._id,
                        friends: this.state.friends
                    }
                }).then((response) => {
                    // handle success
                    console.log("+++++++++ axios response: ", response);
                })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                    });
            });
    }

    // This will search the database for a document that matches the email.
    getFriendByEmail = () => {

        Axios.post("/api/users/getFriendByEmail", {
            email: this.state.friendSearchEmail
        }).then((response) => {
            console.log("response from getFriendByEmail", response.data);
            let tempFriendToAdd = { friend_id: response.data._id, friend_name: response.data.name };
            let tempFriendArray = this.state.friends;
            tempFriendArray.push(tempFriendToAdd);
            console.log("tempFriendToAdd: ", tempFriendToAdd)
            this.setState({
                friends: tempFriendArray
            });
        }).catch(err => console.log(err))
            .then(() => {
                Axios.post("/api/users/updatePlayerFriendList", {
                    params: {
                        playerID: this.state._id,
                        friends: this.state.friends
                    }
                }).then((response) => {
                    // handle success
                    console.log("+++++++++ axios response: ", response);
                })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                    });
            });
    }

    updateDungeonListCreator = (props) => {
        this.setState({ dungeonListCreator: props })
    }

    displayLevel = () => {
        if ((this.state.results[0] / this.state.results[1]) < 0.2) {
            return <div className="persistent">Persistent</div>
        } else if (((this.state.results[0] / this.state.results[1]) > 0.2) && ((this.state.results[0] / this.state.results[1]) < 0.5)) {
            return <div className="adventurer">Adventurer</div>
        } else if (((this.state.results[0] / this.state.results[1]) >= 0.5) && ((this.state.results[0] / this.state.results[1]) < 0.8)) {
            return <div className="plunderer">Plunderer</div>
        } else if (((this.state.results[0] / this.state.results[1]) >= 0.8) && ((this.state.results[0] / this.state.results[1]) < 0.95)) {
            return <div className="ransacker">Ransacker</div>
        } else if (((this.state.results[0] / this.state.results[1]) >= 0.95)) {
            return <div className="dungeon-master">Dungeon Master Supreme</div>
        }
    }

    calcDungeonLevel = (props) => {
        if (props[0] / props[1] < 0.3) {
            return "Myth";
        } else if ((props[0] / props[1] >= 0.3) && (props[0] / props[1] < 0.7)) {
            return "Legend";
        } else if ((props[0] / props[1] >= 0.7)) {
            return "Adventure"
        }
    }

      

render() {
    return (

        <div className="home-center" >

            { // check whether user is authenticated         
                AuthContext.isAuthenticated === false &&
                <Redirect to='/login' />
            }
            < div className="centre" >
                <Image img src={DDLogo} alt="DungeonDash" fluid />
                <Navbar />
            </div>
            <div className="create-nav-grid">
                <div className="nav-display">{this.state.name} is in the stadium!</div>
                <div>{this.displayLevel()}</div>
                <div className="nav-display">WINS: {Math.floor((this.state.results[0] / this.state.results[1]) * 100)}%</div>
            </div>
            <div className="stadium-grid">
                <div><h1>Friends</h1></div>
                <div><h1>Friends' Dungeons</h1></div>
                <div>
                <div className="friend-search">
                    <form className="form">
                        <input
                            value={this.state.friendSearchName}
                            name="friendSearchName"
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="Name of Friend"
                        />
                        <Button variant="success" onClick={this.getFriendByName}>Add Friend</Button>
                    </form>
                    <form className="form">
                        <input
                            value={this.state.friendSearchEmail}
                            name="friendSearchEmail"
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="Email of Friend"
                        />
                        <Button variant="success" onClick={this.getFriendByEmail}>Add Friend</Button>
                    </form>
                    {/* <Button variant="info" block className="fsearch">Search by Name</Button>
                        <Button variant="info" block className="fsearch">Search by Email</Button> */}
                </div>
                    {
                        this.state.friends.map((item, index) => (
                            <div className="button-list-friends">
                                <Button block variant="primary" className="friendsList" id={item.friend_id}
                                    onClick={() => {
                                        this.setState({ dungeonListCreator: item.friend_id });
                                    }} >{item.friend_name}</Button>
                            </div>
                        ))
                    }
                </div>
                <div>
                    {
                        this.state.dungeonList.map((item, index) => (
                            <div className="button-list-dungeons">
                                <Link to={{
                                    pathname:"/play", 
                                    state: {
                                        mapToPass: item._id
                                    } }} ><Button block variant="danger" className="dungeonList" id={item._id}
                                // onClick={() => {
                                //     this.setState({ dungeonListCreator: item.friend_id });
                                // }} 
                                // render this.state.stats as difficulty level, take this out as a function
                                >{item.title} {this.calcDungeonLevel(item.stats)}</Button></Link>{' '} 
                            </div>
                        ))
                    }

                </div>
            </div>
            <Footer />
        </div >

    )
}
}
StadiumPage.contextType = AuthContext;
export default StadiumPage;