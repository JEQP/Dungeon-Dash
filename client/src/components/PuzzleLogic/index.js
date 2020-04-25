import React, { Component, setState } from "react";
import GameGrid from "../GameGrid";
import testingMap from "../../testingMap.json";
import AuthContext from "../../utils/AuthContext";
import HomePage from "../../pages/HomePage";
import GameOverGrid from "../GameOverGrid";


class PuzzleLogic extends Component {

    constructor(props) {
        // necessary line 
        super(props);
        // Don't call this.setState() here!

        this.state = testingMap;
        // this.handleClick = this.handleClick.bind(this);
    }

    setClickedSquare = (props) => {
        let clickedID = props;
        console.log("props in setClickedSquare: ", props);
        this.setState({
            clickedSquare: clickedID,
            moveContinues: true
        })
    }

    //     {/* GridContext contains the state of the grid, including classes, location of avatar, and assumedly location of monster.
    //     Props contains the id of the square that was clicked. */}
    // {/* avaPos is props.clickedSquare */ }
    // $(`#` + avaPos).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');

    // function to move avatar based on clicks

    componentDidUpdate() {

        var avaPos = this.state.avaPos;
        console.log("===componentDidUpdate Starts===")
        console.log("avaPos: " + avaPos);
        console.log("state: ", this.state);


        let clickedSquare = this.state.clickedSquare;

        console.log((clickedSquare) + " clicked");

        // check the move is valid
        let colCurrent = avaPos.charAt(0);
        let rowCurrent = avaPos.charAt(1);
        let colClicked = clickedSquare.charAt(0);
        let rowClicked = clickedSquare.charAt(1);
        console.log("colCurrent: " + colCurrent + " rowCurrent: " + rowCurrent);
        console.log("colClicked: " + colClicked + " rowClicked: " + rowClicked);

        // check to see if the square clicked is in a column or row of the current square
        if (this.state.moveContinues === true && (colClicked === colCurrent || rowClicked === rowCurrent)) {

            // check if column is passable

            if (colClicked === colCurrent) {
                // for going up
                if (rowClicked < rowCurrent) {
                    console.log("if then up - RowClicked: " + rowClicked + " rowCurrent: " + rowCurrent);
                    this.moveUp(rowCurrent, rowClicked, avaPos);
                }
                // for going down
                else if (rowClicked > rowCurrent) {
                    console.log("else if then down - RowClicked: " + rowClicked + " rowCurrent: " + rowCurrent);
                    this.moveDown(rowCurrent, rowClicked, avaPos);
                }
            }
            // check if row is passable
            else if (rowClicked === rowCurrent) {

                // for going right
                if (colClicked > colCurrent) {
                    console.log("if then right - colClicked: " + colClicked + " colCurrent: " + colCurrent);
                    this.moveRight(colCurrent, colClicked, avaPos);
                }
                //for going left
                else if (colClicked < colCurrent) {
                    console.log("if then left - colClicked: " + colClicked + " colCurrent: " + colCurrent);
                    this.moveLeft(colCurrent, colClicked, avaPos);
                }
            }
        }
        else if (this.state.moveContinues === true && !(colClicked === colCurrent || rowClicked === rowCurrent)) {
            console.log("invalid move moveContinues: ", this.state.moveContinues);
            alert("Invalid Move");
        }

    }

    // NOTE: This format of NAME = ARROW FUNCTION is called an arrow function method
    moveUp = (rowCurrent, rowClicked, avaMove) => {
        console.log("===moveUp starts===");
        console.log("moveUpsquares: " + rowCurrent + " " + rowClicked + " id: " + avaMove);
        // for each square moving up the grid, as row decreases, check if passable. 
        // Start on current square in case of wall in that square.
        // Note that avaMove starts with the value of avaPos from the calling function.
        let moveContinues = this.state.moveContinues;
        for (var i = rowCurrent; i >= rowClicked; i--) {
            console.log("moveUp for loop " + i + " moveContinues: ", moveContinues);


            if (moveContinues === true) {
                avaMove = avaMove.charAt(0) + i; // column doesn't change, row will be i
                console.log("avaMove: ", avaMove);

                let eatenByMonster = this.checkMonster(avaMove.charAt(0), i);
                console.log("eatenByMonster: ", eatenByMonster);
                if (eatenByMonster === true) {
                    moveContinues = false;
                }


                // console.log("state.squarelist (" + i + ") in moveUp: ", this.state.squareList);
                let currentSquare = this.state.squareList.find(element => element.id === avaMove);
                // console.log("currentSquare: ", currentSquare);

                if (currentSquare.pit === true) {
                    console.log("You fell into a pit. No-one lowers a basket. Game over.");
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    moveContinues = false;
                    // END TURN
                } else if (currentSquare.topwall === true) {
                    console.log("There's a wall, so you stop at ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    // END TURN
                } else if (i == rowClicked) {
                    console.log("You made it unimpeded to ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    //END TURN
                }
            }
        }
    }

    moveDown = (rowCurrent, rowClicked, avaMove) => {
        console.log("===moveDown starts===");
        console.log("moveDownsquares: " + rowCurrent + " " + rowClicked + "id: " + avaMove);

        let moveContinues = this.state.moveContinues;
        for (var i = rowCurrent; i <= rowClicked; i++) {
            console.log("moveDown for loop " + i + " moveContinues: ", moveContinues);


            if (moveContinues === true) {
                avaMove = avaMove.charAt(0) + i; // column doesn't change, row will be i
                console.log("avaMove: ", avaMove);

                let eatenByMonster = this.checkMonster(avaMove.charAt(0), i);
                console.log("eatenByMonster: ", eatenByMonster);
                if (eatenByMonster === true) {
                    moveContinues = false;
                }


                let currentSquare = this.state.squareList.find(element => element.id === avaMove);


                // this.checkMonster(avaMove.charAt(0), i);


                if (currentSquare.pit === true) {
                    console.log("You fell into a pit. No-one lowers a basket. Game over.");
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    moveContinues = false;
                    // END TURN

                }
                else if (currentSquare.bottomwall === true) {
                    console.log("There's a wall, so you stop at ", avaMove);
                    // avaMove = avaMove.charAt(0) + (i - 1); // because it will be in the square above
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    return;

                }
                else if (i == rowClicked) {
                    console.log("You made it unimpeded to ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    //END TURN
                }

            }
        }
    }

    moveRight = (colCurrent, colClicked, avaMove) => {
        console.log("===moveRight starts===");
        console.log("moveRightsquares: " + colCurrent + " " + colClicked + " id: " + avaMove);

        let moveContinues = this.state.moveContinues;
        for (var i = colCurrent; i <= colClicked; i++) {

            console.log("moveRight for loop " + i + " moveContinues: ", moveContinues);

            if (moveContinues === true) {
                avaMove = i + avaMove.charAt(1); // column is i, row doesn't change
                console.log("avaMove in right for loop: ", avaMove);

                // var currentSquareClassList = $("#" + avaMove).attr("class").split(/\s+/);


                let eatenByMonster = this.checkMonster(i, avaMove.charAt(1));
                console.log("eatenByMonster: ", eatenByMonster);
                if (eatenByMonster === true) {
                    moveContinues = false;
                }

                let currentSquare = this.state.squareList.find(element => element.id === avaMove);

                if (currentSquare.pit === true) {
                    console.log("You fell into a pit. No-one lowers a basket. Game over.");
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    moveContinues = false;
                    // END TURN
                }
                else if (currentSquare.rightwall === true) {

                    console.log("There's a wall, so you stop at ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    // END TURN
                }
                else if (i == colClicked) {
                    console.log("You made it unimpeded to ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    //END TURN
                }


            }
        }
    }

    moveLeft = (colCurrent, colClicked, avaMove) => {
        console.log("===moveLeft starts===");
        console.log("moveLeftsquares: " + colCurrent + " " + colClicked + " id: " + avaMove);

        let moveContinues = this.state.moveContinues;

        for (var i = colCurrent; i >= colClicked; i--) {
            console.log("moveRight for loop " + i + " moveContinues: ", moveContinues);

            if (moveContinues === true) {
                avaMove = i + avaMove.charAt(1); // column is i, row doesn't change
                console.log("avaMove in right for loop: ", avaMove);

                let eatenByMonster = this.checkMonster(i, avaMove.charAt(1));
                console.log("eatenByMonster: ", eatenByMonster);
                if (eatenByMonster === true) {
                    moveContinues = false;
                }

                let currentSquare = this.state.squareList.find(element => element.id === avaMove);


                if (currentSquare.pit === true) {
                    console.log("You fell into a pit. No-one lowers a basket. Game over.");
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    moveContinues = false;
                    // END TURN
                }
                else if (currentSquare.leftwall === true) {

                    console.log("There's a wall, so you stop at ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    // END TURN
                }
                else if (i == colClicked) {
                    console.log("You made it unimpeded to ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    //END TURN
                }

            }
        }

    }



    checkMonster = (colCurrent, rowCurrent) => {
        // define squares to be checked
        console.log("==checkMonster==");
        let colLeft = colCurrent;
        colLeft--;
        let squareLeft = `${colLeft}${rowCurrent}`;
        console.log("squareLeft: ", squareLeft);
        let colRight = colCurrent;
        colRight++;
        let squareRight = `${colRight}${rowCurrent}`;
        console.log("squareRight: " + squareRight);
        let rowAbove = rowCurrent;
        rowAbove--;
        let squareAbove = `${colCurrent}${rowAbove}`;
        console.log("squareAbove: " + squareAbove);
        let rowBelow = rowCurrent;
        rowBelow++;
        let squareBelow = `${colCurrent}${rowBelow}`;
        console.log("squareBelow: " + squareBelow);
        let squareThis = `${colCurrent}${rowCurrent}`;
        console.log("squareThis: ", squareThis);
        let thisSquare = this.state.squareList.find(element => element.id === squareThis);
        var eatenByMonster = false;


        // checking square left
        if (colCurrent > 1) {
            if (thisSquare.leftwall === false) {
                let checkSquareMonster = this.state.squareList.find(element => element.id === squareLeft);
                if (checkSquareMonster.monster === true) {
                    console.log("A monster from " + squareLeft + " ate you at " + thisSquare);
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    // END TURN
                    return eatenByMonster = true;
                }
            }
        }

        //checking square right 
        if (colCurrent < 5) {
            if (thisSquare.rightwall === false) {
                let checkSquareMonster = this.state.squareList.find(element => element.id === squareRight);
                if (checkSquareMonster.monster === true) {
                    console.log("A monster from " + squareRight + " ate you at " + thisSquare);
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    // END TURN
                    return eatenByMonster = true;
                }
            }
        }

        // checking square above
        if (rowCurrent > 1) {
            if (thisSquare.topwall === false) {
                let checkSquareMonster = this.state.squareList.find(element => element.id === squareAbove);
                if (checkSquareMonster.monster === true) {
                    console.log("A monster from " + squareAbove + " ate you at " + thisSquare);
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    // END TURN
                    return eatenByMonster = true;
                }
            }

        }

        // checking square below
        if (rowCurrent < 5) {
            if (thisSquare.bottomwall === false) {
                let checkSquareMonster = this.state.squareList.find(element => element.id === squareBelow);
                if (checkSquareMonster.monster === true) {
                    console.log("A monster from " + squareBelow + " ate you at " + thisSquare);
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    return eatenByMonster = true;
                }
            }
        }
        return eatenByMonster;
    }

    changeAvatarLocation = (avaMove) => {
        // console.log("changeAvatarLocation this.state: ", this.state);
        // console.log("changeAvatarState squareList: ", this.state.squareList);
        console.log("===changeAvatarLocation=== avaMove: ", avaMove);

        let newState = this.state.squareList;
        // the problem with if avaPos is false, else if avaMove is true, is that the loop runs again before the state is updated. 
        for (let i = 0; i < newState.length; i++) {
            if (newState[i].id == avaMove) {
                newState[i].avatar = true;
                // console.log("matching avaPos: ", this.state.avaPos);
                // console.log("if newState[" + i + "]: ", newState[i]);
            } else {
                newState[i].avatar = false;
                // console.log("matching avaMov: ", avaMove);
                // console.log("else newState[" + i + "]: ", newState[i]);
            }

        }
        //async problems here.
        console.log("newState after avatar change: ", newState);
        // let moveContinues = false;

        this.setState(() => ({
            squareList: newState,
            clickedSquare: "",
            avaPos: avaMove,
            moveContinues: false
        }),
            () => console.log("State after moving avatar: ", this.state));

    }



    renderPage = () => {
        if (this.state.gameContinues === true) {
            return <GameGrid
                setClickedSquare={this.setClickedSquare}
                squareList={this.state.squareList}
            />;
        } else if (this.state.gameContinues === false) {
            return <GameOverGrid
                squareList={this.state.squareList}
            />;
        } else {
            return <HomePage />;
        }
    };

    render() {
        console.log("render state: ", this.state);
        // put a value in state if game is continueing, and conditionally render this based on that.
        return (
            <div>
                {this.renderPage()}
            </div>

        );
    }
}


PuzzleLogic.contextType = AuthContext;
export default PuzzleLogic;