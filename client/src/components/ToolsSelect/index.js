import React from "react";
import "./style.css";
import plank from "../../assets/plank.png";
import meat from "../../assets/meat.png";
import Button from 'react-bootstrap/Button';

function ToolsSelect(props) {
    console.log("ToolsSelect props: ", props);
    return (
        <section className="tools-grid">
            <div className="square-tools" onClick={() => props.toolChosen("plank")} >
                <img id="plank" alt="plank" src={plank}></img>
            </div>

            <div className="square-tools" onClick={() => props.toolChosen("meat")} >
                <img id="meat" alt="meat" src={meat}></img>
            </ div>
            <Button variant="primary" size="lg" block onClick={() => props.startGame(true)} >Enter Dungeon</Button>
        </section>
    );
}

export default ToolsSelect;