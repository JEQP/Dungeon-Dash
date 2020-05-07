import React, { Component } from "react";
import "./style.css";
import AuthContext from "../../utils/AuthContext";
import { Redirect } from "react-router-dom";
import DDlogo2lines from "../../assets/DDlogo2lines.png";
import Image from 'react-bootstrap/Image';
import Navbar from "../Navbar";
import Footer from "../Footer";

class Credits extends Component {
    render() {
    return (
        <div className="container white-text">
            
            { // check whether user is authenticated         
                AuthContext.isAuthenticated === false &&
                <Redirect to='/login' />
            }
            <Image img src={DDlogo2lines} alt="DungeonDash" fluid />
            <Navbar />
            <div className="credits-wrapper">
            <div className="container credits-container">
            <p className="credits-text">
                This web-app was designed and coded by <a href="https://github.com/JEQP" alt="GitHub link to JEQP" target="_blank" rel="noopener noreferrer">James Quintana Pearce</a> in React (bootstrapped with react-create-app), Mongo database hosted at MongoDB, Express, and Node.
            </p>
            <p className="credits-text">
                Background image by <a href="https://scop.io/collections/vendors?q=Ezz+Al+Deen+Dwaikat" alt="Ezz Al Deen Dwaikat" target="_blank" rel="noopener noreferrer">Ezz Al Deen Dwaikat</a>, via <a href="http://www.scop.io" alt="Scop.io">Scop.io</a>
            </p>
            <p className="credits-text">
                Background sound from <a href="http://www.zapsplat.com" alt="zapsplat" target="_blank" rel="noopener noreferrer">Zapsplat.com</a>
            </p>
            <p className="credits-text">
                User Authentication is based on <a href="https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669" alt="link to authentication blog" target="_blank" rel="noopener noreferrer">this walkthrough</a> by Rishi Prasad.
            </p>
            <p className="credits-text">
                Great thanks for assistance in resolving coding errors and challenges goes to Jack Song, Harshpreet Singh, and Sandesh Pathak.
            </p>
            </div>
            <Footer />
            </div>
          
        </div>
    )
        }
}

export default Credits;
Credits.contextType = AuthContext;