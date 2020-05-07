import React from "react";
import "./style.css";
import plank from "../../assets/plank.png";
import meat from "../../assets/meat.png";


function ToolsSelect(props) {
    console.log("ToolsSelect props: ", props);
    return (
        <section >
            <div className="tools-grid">
                <div className="instructions">Select 2 Tools</div>
                <div className="square-tools" onClick={() => props.toolChosen("plank")} >
                    <img id="plank" alt="plank" src={plank}></img>
                </div>

                <div className="square-tools" onClick={() => props.toolChosen("meat")} >
                    <img id="meat" alt="meat" src={meat}></img>
                </ div>
            </div>
        </section>
    );
}

export default ToolsSelect;