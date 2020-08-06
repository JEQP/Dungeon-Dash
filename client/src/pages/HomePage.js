import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import AuthContext from "../utils/AuthContext";
import Navbar from "../components/Navbar";
import "./style.css";
import DDlogo2lines from "../assets/DDlogo2lines.png";
import Footer from "../components/Footer";
import Music from "../assets/backgroundmusic.mp3";
import Logout from "../components/Logout";
import ToolUseDemo from "../assets/ddinstruct07.gif";


class HomePage extends Component {
    // sets state for media query
    constructor(props) {
        super(props)
        this.state = { matches: window.matchMedia("(min-width: 768px)").matches };
    }
    // conducts media query. In return() select whether state matches or not. 
    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 768px)").addListener(handler);
    }

    alert = () => {
        this.myRef = React.createRef();

        return (
            <audio ref={this.myRef} src={Music} autoPlay />
        )
    }



    render() {
        return (
            <div>
{console.log("matches homepage: ",this.state.matches)}
                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <div className="home-page">
                    <Logout />
                    <Image img src={DDlogo2lines} alt="DungeonDash" fluid />
                    <Navbar />
                    {this.state.matches &&
                        <div className="demo-grid">
                            <div className="container home-centre">

                                <p className="home-instructions">Congratulations! You're on a journey to glory and riches by dashing through dungeons. There a pitfalls to avoid and monsters to dodge, but always treasure somewhere inside. You can hear ambient sound with the buttton in the bottom right of the screen. To choose another dungeon, click the button at the bottom.</p>
                                <p className="home-instructions">You move through the dungeons by clicking on a square, either horizontally or vertically. I hope I don't need to explain that you can't move through walls. If you fall into a pit, you won't get out again. If you stroll beside a monster, it will devour you. Avoid both and arrive at the treasure, and you'll find a device to teleport out of the dungeon to safety!</p>
                                <p className="home-instructions">As you start you can choose two things to carry with you which may help you in the dungeon. Planks, or meat, or one of each. To use them, click on the item and then click on the square you wish to place it. Be considered in your actions, for you can only place the items once. The plank you can place beside you and safely cross a pit, the meat you can throw up to two squares away so it lures any monster it lands beside.</p>
                                <p className="home-instructions2">Venture forth boldly ... and GOOD LUCK.</p>
                            </div>
                            <div>
                                <img src={ToolUseDemo} alt="Using Tools Demonstration" className="use-tool-demo" />
                            </div>
                        </div>
                    }
                    {!this.state.matches &&
                        <div className="demo-grid720">
                            <div className="container home-centre">

                                <p className="home-instructions">Congratulations! You're on a journey to glory and riches by dashing through dungeons. There a pitfalls to avoid and monsters to dodge, but always treasure somewhere inside. You can hear ambient sound with the buttton in the bottom right of the screen. To choose another dungeon, click the button at the bottom.</p>
                                <p className="home-instructions">You move through the dungeons by clicking on a square, either horizontally or vertically. I hope I don't need to explain that you can't move through walls. If you fall into a pit, you won't get out again. If you stroll beside a monster, it will devour you. Avoid both and arrive at the treasure, and you'll find a device to teleport out of the dungeon to safety!</p>
                                <p className="home-instructions">As you start you can choose two things to carry with you which may help you in the dungeon. Planks, or meat, or one of each. To use them, click on the item and then click on the square you wish to place it. Be considered in your actions, for you can only place the items once. The plank you can place beside you and safely cross a pit, the meat you can throw up to two squares away so it lures any monster it lands beside.</p>
                                <p className="home-instructions2">Venture forth boldly ... and GOOD LUCK.</p>
                            </div>
                            <div>
                                <img src={ToolUseDemo} alt="Using Tools Demonstration" className="use-tool-demo" />
                            </div>
                        </div>}
                </div>
                <Footer />

            </div>
        )
    }
}

export default HomePage;
HomePage.contextType = AuthContext;