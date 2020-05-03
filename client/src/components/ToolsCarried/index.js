import React from "react";
import "./style.css";
import plank from "../../assets/plank.png";
import meat from "../../assets/meat.png";

function ToolsCarried(props) {
console.log("ToolsCarried props: ", props);
    return (
        <section className="tools-carried-grid">
            {
            props.tools.map((item, index) => (
                console.log("toolscarried iterated: ", item),
                <div className="square-tools" key={index} onClick={() => props.toolSelected(item)}>
                    {
                        item === "plank" &&
                        <img id="plank" alt="plank" src={plank}></img>
                    }
                    {
                        item === "meat" &&
                        <img id="meat" alt="meat" src={meat}></img>
                    }
                </div>
            ))}
        </section>
    );
}

export default ToolsCarried;