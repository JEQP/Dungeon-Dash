import React from 'react';
import "../style/style.css";
import Avatar from "../../../assets/avatar.png";
import Monster from "../../../assets/bugblatter.png";
import Plank from "../../../assets/plank.png";
import Meat from "../../../assets/meat.png";
import Chest from "../../../assets/treasure.png";



// Need to Add Game Over announcement
// and options to decide what to do, replay or leave. 

function GameLost(props) {


    console.log("props: ", props);
    return (
        <section className="game-grid">
            <p className="gameover">You dieded</p>
            <div>
            {
                props.squareList.map((item, index) => (
                    <div className={item.classList} id={item.id}>
                       {
                            item.avatar === true &&
                            <img id="avaIcon" alt="avatar" src={Avatar}></img>
                        }
                        {
                            item.monster === true &&
                            <img id="monsIcon" alt="monster" src={Monster}></img>
                        }
                        {
                            item.plank === true &&
                            <img id="plankIcon" alt="plank" src={Plank}></img>
                        }
                        {
                            item.meat === true &&
                            <img id="meatIcon" alt="meat" src={Meat}></img>
                        }
                        {
                            item.treasure === true &&
                            <img id="treasureIcon" alt="treasure" src={Chest}></img>
                        }
                    </div>
                ))
            }
</div>
        </section>
    )

}

export default GameLost;

// <div className="square" id="11">a</div>
                // <div className="square" id="21">b</div>
                // <div className="square" id="31">c</div>
                // <div className="square" id="41">d</div>
                // <div className="square" id="51">e</div>
                // <div className="square" id="12">f</div>
                // <div className="square monster" id="22">g</div>
                // <div className="square" id="32">h</div>
                // <div className="square" id="42">i</div>
                // <div className="square" id="52">j</div>
                // <div className="square" id="13">k</div>
                // <div className="square monster wallLeft" id="23">l</div>
                // <div className="square" id="33">m</div>
                // <div className="square" id="43">n</div>
                // <div className="square" id="53">o</div>
                // <div className="square wallTop" id="14">p</div>
                // <div className="square" id="24">q</div>
                // <div className="square" id="34">r</div>
                // <div className="square" id="44">s</div>
                // <div className="square" id="54">t</div>
                // <div className="square wallLeft" id="15"><img id="avaIcon" src="./avatar.png"></img></div>
                // <div className="square" id="25">v</div>
                // <div className="square" id="35">w</div>
                // <div className="square" id="45">x</div>
                // <div className="square" id="55">y</div> 