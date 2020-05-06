import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import AuthContext from "../utils/AuthContext";
import Navbar from "../components/Navbar";
import "./style.css";
import DDlogo2lines from "../assets/DDlogo2lines.png";


class HomePage extends Component {

    render() {
        return (
            <div>

                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <div className="home-page">
                    <Image img src={DDlogo2lines} alt="DungeonDash" fluid />
                    <Navbar />
                    <div className="container home-centre">
                        
                            <p className="home-instructions">Congratulations! You're on a journey to glory and riches by dashing through dungeons. There a pitfalls to avoid and monsters to dodge, but always treasure somewhere inside.</p>
                            <p className="home-instructions">You move through the dungeons by clicking on a square, either horizontally or vertically. I hope I don't need to explain that you can't move through walls. If you fall into a pit, you won't get out again. If you stroll beside a monster, it will devour you. Avoid both and arrive at the treasure, and you'll find a device to teleport out of the dungeon to safety!</p>
                            <p className="home-instructions">As you start you can choose two things to carry with you which may help you in the dungeon. Planks, or meat, or one of each. To use them, click on the item and then click on the square you wish to place it. Be considered in your actions, for you can only place the items once. The plank you can place beside you, the meat you can throw up to two squares away.</p>
                            <p className="home-instructions2">Venture forth boldly ... and GOOD LUCK.</p>
                        

                        {/* <div className="row">
                        <div className="col-sm-12"> */}
                        {/* <div className="button-holder">
                        <Link to="/play" className="link-text"><Button variant="primary" size="lg" block>Play Now</Button></Link>{' '}
                        </div>
                        <div className="button-holder">
                        <Link to="/create" className="link-text"><Button variant="success" size="lg" block>Create Dungeon</Button></Link>{' '}
                        </div>
                        <div className="button-holder">
                        <Link to="/stadium" className="link-text"><Button variant="warning" size="lg" block>Enter Stadium</Button></Link>{' '}
                        </div> */}
                        {/* </div>
                    </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;
HomePage.contextType = AuthContext;