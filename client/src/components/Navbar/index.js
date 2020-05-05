import React from "react";
import "./style.css";
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from "react-router-dom";

function Navbar(props) {
console.log("Navbar props: ", props);
    return (
        <div>
             <Link to="/play" className="link-text"><Button variant="primary"  >Play Now</Button></Link>{' '}
             <Link to="/create" className="link-text"><Button variant="success"  >Create Dungeon</Button></Link>{' '}
             <Link to="/stadium" className="link-text"><Button variant="warning" >Enter Stadium</Button></Link>{' '}
        </div>
    );
}

export default Navbar;