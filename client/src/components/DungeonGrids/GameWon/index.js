import React from 'react';
import "../style/style.css";
import Avatar from "../../../assets/avatar.png";
import Monster from "../../../assets/bugblatter.png";
import Plank from "../../../assets/plank.png";
import Meat from "../../../assets/meat.png";
import Chest from "../../../assets/treasure.png";



function GameWon(props) {

    return (
        <section >
            <div className="winner">
                Celebrate! <br />
                For you have gained the treasure and escaped the dungeon. <br />
                Another win.
            </div>
            <div className="game-grid">
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

export default GameWon;
