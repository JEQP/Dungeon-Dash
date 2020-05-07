import React, { Component } from "react";
import PuzzleLogic from "../components/PuzzleLogic";
import { Redirect } from 'react-router-dom';
import AuthContext from "../utils/AuthContext";
import ChooseMap from "../components/ChooseMap";
import DifficultyMaps from "../components/ChooseMap/difficultyMaps";
import PreviousMaps from "../components/ChooseMap/previousMaps";
import FriendsMaps from "../components/ChooseMap/friendsMaps";
import FriendsDungeons from "../components/ChooseMap/friendsDungeons";
import Axios from "axios";
import "./style.css";
import DDLogo from "../assets/DDlogo.png";
import Image from 'react-bootstrap/Image';
import ReactDOM from 'react-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



class PlayPage extends Component {

    constructor(props) {
        // necessary line 
        super(props);
        // Don't call this.setState() here!
        console.log("props in constructor: ", props);
        this.state = {
            isMapChosen: false,
            typeMapChosen: "",
            mapChosen: [],
            player: "",
            playerStats: [],
            playerDungPlayed: [],
            friendsList: [],
            friendsMapList: [],
            movesTaken: 0
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

    componentDidMount() {
        const user = this.context;
        console.log("set userid ", user.email)
        Axios.post("/api/users/getUserID", {
            email: user.email
        }).then((response) => {
            console.log("response from getUserID", response.data);
            this.setState({
                player: response.data._id,
                playerStats: response.data.results,
                playerDungPlayed: response.data.dungeonsPlayed,
                friendsList: response.data.friends
            })
            console.log("state after user update: ", this.state)
        }).catch(err => console.log(err));
        console.log("props in componentDidMount: ", this.props)
        // This is to catch a redirect from Stadium Page
        // if (this.props.location.state) {
        //     console.log ("mapToPass in PlayPage: ", this.props.location.state);
        //     this.getMapById(this.props.mapToPass); 
        // }
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
                    mapChosen: response.data[0],
                    isMapChosen: true
                })
            })
                .catch((error) => {
                    // handle error
                    console.log(error);
                });
        }
    }


    setMovesTaken = (props) => {
        let moveCount = this.state.movesTaken;
        if (props === true) {
            moveCount++;
            this.setState({ movesTaken: moveCount });
        } else {
            this.setState({ movesTaken: 0 }); // this is a problem
        }
    }


    // This restarts the map by setting isMapChosen to false, so PuzzleLogic ceases to be rendered.
    // It sets typeMapChosen to replay, and in renderPage() this if condition sets isMapChosen to true.
    // mapChosen hasn't changed, so it renders the same map from the stored string.
    restartDungeon = (props) => {
        if (props === true) {
            this.setState({ typeMapChosen: "replay", isMapChosen: false });
            console.log("restartDungeon in PlayPage Run");
        }
    }
    // This updates the stats in the dungeon document in the database. It accepts as props gameWon
    // Stats is an array of two integers, the first being how many times the game has been won, the second how many times it has been played.
    // difficulty is calculated with a simple division of the two. 
    updateStats = (props) => {
        console.log("@@@@@ updateStats running @@@@@");
        console.log("props: ", props);
        let dungeonID = this.state.mapChosen._id;
        let dungeonTitle = this.state.mapChosen.title;
        console.log("dungeonID: ", dungeonID);
        console.log("dungeonTitle: ", dungeonTitle);
        let newStats = this.state.mapChosen.stats;
        console.log("newStats: ", newStats);
        let gamesWon = newStats[0];
        let gamesPlayed = newStats[1];
        let difficulty = "";

        if (props === true) {
            gamesWon++;
            gamesPlayed++;
        }
        else {
            gamesPlayed++;
        }

        newStats[0] = gamesWon;
        newStats[1] = gamesPlayed;
        let diff = gamesWon / gamesPlayed;
        console.log("diff: ", diff);

        if (diff < 0.3) {
            difficulty = "Myth";
        } else if (diff > 0.7) {
            difficulty = "Adventurer";
        } else {
            difficulty = "Legend";
        }
        console.log("difficulty: ", difficulty);

        Axios.post("/api/dungeons/updateMap", {
            params: {
                dungeonID: dungeonID,
                newStats: newStats,
                difficulty: difficulty
            }
        }).then((response) => {
            // handle success
            console.log("+++++++++ axios response: ", response);
        })
            .catch((error) => {
                // handle error
                console.log(error);
            });

        // UPDATE PLAYER STATS, same mechanism.

        let player = this.state.player;
        let playerStats = this.state.playerStats;
        let playerDungPlayed = this.state.playerDungPlayed;

        if (playerStats !== null && playerDungPlayed !== null) {
            console.log("authContext: ", AuthContext);
            console.log("pstats playerStats: ", playerStats);
            console.log("pstats playerDungPlayed: ", playerDungPlayed);

            let playerGamesWon = playerStats[0];
            let playerGamesPlayed = playerStats[1];
            if (props === true) {
                playerGamesWon++;
                playerGamesPlayed++;
            } else {
                playerGamesPlayed++;
            }

            playerStats[0] = playerGamesWon;
            playerStats[1] = playerGamesPlayed;
            let tempDungPlayed = { id: dungeonID, title: dungeonTitle };
            playerDungPlayed.push(tempDungPlayed);
            console.log("PlayerStats: " + playerStats + " playerDungPlayed: " + playerDungPlayed);


            Axios.post("/api/users/updatePlayer", {
                params: {
                    playerID: player,
                    playerStats: playerStats,
                    dungeonsPlayed: playerDungPlayed
                }
            }).then((response) => {
                // handle success
                console.log("+++++++++ axios response: ", response);
            })
                .catch((error) => {
                    // handle error
                    console.log(error);
                });
        }
    }

    getMapById = (props) => {
        Axios.post("/api/dungeons/mapById", {
            params: {
                _id: props
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
    }

    getDifficultyMap = (props) => {
        Axios.post("/api/dungeons/getDifficultyMaps", {
            params: {
                difficulty: props
            }
        }).then((response) => {
            console.log("DIFFICULTY map response: ", response.data);
            this.setState({
                mapChosen: response.data[0],
                isMapChosen: true
            })

        }).catch((error) => {
            // handle error
            console.log(error);
        });
    }

    getMapByFriend_id = (props) => {
        console.log("props in getMapByFriend_ID: ", props)
        Axios.post("/api/dungeons/getDungeons", {
            params: {
                friendID: props
            }
        }).then((response) => {
            console.log("FRIEND MAP RESPONSE", response.data);
            if (response.data !== null) {
                this.setState({
                    friendsMapList: response.data
                })
            }
        });
    }

    // This will conditionally render components based on state 
    // If no type of map is chosen, it will display ChooseMap, for players to select type of map
    renderPage = () => {
        console.log("state in renderPage: ", this.state);
        if (this.state.isMapChosen === true) {
            return <PuzzleLogic dungeonMap={JSON.parse(this.state.mapChosen.dungeonMap)}
                restart={this.restartDungeon}
                updateStats={this.updateStats}
                title={this.state.mapChosen.title}
                difficulty={this.state.mapChosen.difficulty}
                moveCount={this.state.movesTaken}
                setMovesTaken={this.setMovesTaken} />
        } else if (this.state.typeMapChosen === "replay") {
            console.log("replay run");
            this.setState({ isMapChosen: true });
        } else if (this.state.typeMapChosen === "") {
            return <ChooseMap setMapType={this.setMapType} />
        } else if (this.state.typeMapChosen === "friends") {
            console.log("friendsList: ", this.state.friendsList);
            console.log("friendsMapList: ", this.state.friendsMapList);
            if (this.state.friendsMapList.length < 1) {
                return <FriendsMaps
                    friendsList={this.state.friendsList}
                    getMapByFriend_id={this.getMapByFriend_id} />
            } else {
                return <FriendsDungeons
                    dungeonList={this.state.friendsMapList}
                    getMapById={this.getMapById} />
            }
        } else if (this.state.typeMapChosen === "difficulty") {
            return <DifficultyMaps getDifficultyMap={this.getDifficultyMap} />
        } else if (this.state.typeMapChosen === "previous") {
            return <PreviousMaps dungeonList={this.state.playerDungPlayed}
                getMapById={this.getMapById} />
        }

    }

    changeDungeon = () => {
        this.setState({
            isMapChosen: false,
            typeMapChosen: "",
            mapChosen: []
        })
    }


    render() {
        return (

            <div className="home-center">

                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <div className="centre">
                    <Image img src={DDLogo} alt="DungeonDash" fluid />
                    <Navbar />
                </div>

                {this.renderPage()}
                <div className="centre">
                <div className="change-dungeon" onClick={() => this.changeDungeon(true)}>Change Dungeon</div>
                </div>
                   
                <Footer />
            </div>
        )
    }
}
PlayPage.contextType = AuthContext;
export default PlayPage;