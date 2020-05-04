import React, { Component } from "react";
import AuthContext from "../utils/AuthContext";
import Axios from "axios";
import DDLogo from "../assets/DDlogo.png";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from "react-router-dom";
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
            _id: ""

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
            console.log("response from getUserID", response.data._id);
            this.setState({
                name: response.data.name,
                email: response.data.email,
                friends: response.data.friends,
                dungeonsPlayed: response.data.dungeonsPlayed,
                results: response.data.results,
                dungeons: response.data.dungeons,
                _id: response.data._id
            });
        }).catch(err => console.log(err));

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
                    {/* <Navbar /> */}
                </div>
                <div className="nav-grid">
                <Link to="/home" className="link-text"><div className="homePagebtn">Homepage</div></Link>
                <div>RANK</div>
            </div>
                <div className="stadium-grid">
                    <div className="friend-search">
                        <Button variant="info" block className="fsearch">Search by Name</Button>
                        <Button variant="info" block className="fsearch">Search by Email</Button>
                    </div>
                    <div>Friend's Dungeons</div>
                    <div>series of buttons of friends</div>
                    <div>series of buttons of dungeons</div>
                </div>

            </div >

        )
    }
}
StadiumPage.contextType = AuthContext;
export default StadiumPage;