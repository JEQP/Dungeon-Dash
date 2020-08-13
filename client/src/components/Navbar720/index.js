import React from "react";
import "./style.css";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <div className="navbar-layout">
            <Button variant="primary" id="pn" onClick={() => props.changeDungeon(true)}>New Dungeon</Button>{' '}
            <Link to="/create" className="link-text" id="cd"><Button variant="success"  >Create Dungeon</Button></Link>{' '}
            <Link to="/stadium" className="link-text" id="es"><Button variant="warning" >Enter Stadium</Button></Link>{' '}
        </div>
    );
}

export default Navbar;