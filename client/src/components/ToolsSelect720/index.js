import React from "react";
import "./style.css";
import plank from "../../assets/plank.png";
import meat from "../../assets/meat.png";


function ToolsSelect720(props) {
    console.log("ToolsSelect props: ", props);
    return (
        <section >
            <div className="tools-grid720">
                <div className="instructions">Select Two<br/> Tools</div>
                <div className="square-tools720" onClick={() => props.toolChosen("plank")} >
                    <img id="plank" alt="plank" src={plank}></img>
                </div>

                <div className="square-tools720" onClick={() => props.toolChosen("meat")} >
                    <img id="meat" alt="meat" src={meat}></img>
                </ div>
            </div>
        </section>
    );
}

export default ToolsSelect720;