import React, { useState, setState, useEffect } from 'react';
import testingMap from "../../testingMap.json";
import "./style.css";
import Avatar from "../../assets/avatar.png";
import PuzzleLogic from "../PuzzleLogic";




function GameGrid() {

    const [squareList, setSquareList] = useState(testingMap);
    const [clickedSquare, setClickedSquare] = useState("15");

    const GridContext = React.createContext();

    useEffect(() => {
        
        <GridContext.Provider value={squareList}>
            
            <PuzzleLogic clickedSquare={clickedSquare} />
     
        </GridContext.Provider>
    });

    return (
        <section className="game-grid">
            {
                squareList.map((item, index) => (
                    <div className={item.classList} id={item.id} onClick={() => setClickedSquare(item.id)}>
                        {
                            item.avatar === true &&
                            <img id="avaIcon" src={Avatar}></img>
                        }
                    </div>
                ))
            }

        </section>
    )

}

export default GameGrid;

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