import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import AuthContext from "../utils/AuthContext";
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
                <Image img src={DDlogo2lines} alt="DungeonDash" fluid/>
                    <div className="container home-centre">
                        {/* <div className="row">
                        <div className="col-sm-12"> */}
                        <div className="button-holder">
                        <Link to="/play" className="link-text"><Button variant="primary" size="lg" block>Play Now</Button></Link>{' '}
                        </div>
                        <div className="button-holder">
                        <Link to="/create" className="link-text"><Button variant="success" size="lg" block>Create Dungeon</Button></Link>{' '}
                        </div>
                        <div className="button-holder">
                        <Link to="/stadium" className="link-text"><Button variant="warning" size="lg" block>Enter Stadium</Button></Link>{' '}
                        </div>
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