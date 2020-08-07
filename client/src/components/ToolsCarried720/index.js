import React from "react";
import "./style.css";
import plank from "../../assets/plank.png";
import meat from "../../assets/meat.png";

function ToolsCarried720(props) {
    console.log("ToolsCarried props: ", props);

    return (
        <section className="tools-carried-grid720">
            {
                props.tools.map((item, index) => (

                    <div className="square-tools720" key={index} onClick={() => props.setToolSelected(item)}>
                        {
                            item === "plank" && (
                                props.toolSelected === "plank" ?
                                    <img id="plank-selected" alt="plank" src={plank}></img>
                                    : <img id="plank" alt="plank" src={plank}></img>
                            )
                        }
                        {
                            item === "meat" && (
                                props.toolSelected === "meat" ?
                                    <img id="meat-selected" alt="meat" src={meat}></img>
                                    : <img id="meat" alt="meat" src={meat}></img>
                            )
                        }
                    </div>
                ))}
        </section>
    );
}

export default ToolsCarried720;