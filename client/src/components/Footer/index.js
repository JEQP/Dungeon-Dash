
import React from "react";
import "./style.css";
import Music from "./Music.js";
import { Link } from "react-router-dom";

function Footer() {
    
    return (
        <div className="phantom">
            <div className="footer">
                <div><Link to="/credits" className="footer-credits-link">Credits</Link>{' '}</div>
                <div>Dungeon Dash &copy; JEQP 2020</div>
                <Music className="music-button"/>
            </div>
            
        </div>
    );
}

export default Footer;