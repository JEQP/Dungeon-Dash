import React, { Component } from "react";
import GameGrid from "../DungeonGrids/GameGrid";
import AuthContext from "../../utils/AuthContext";
import HomePage from "../../pages/HomePage";
import GameGridMeat from "../DungeonGrids/GameGridMeat";
import GameGridPlank from "../DungeonGrids/GameGridPlank";
import GameLost from "../DungeonGrids/GameLost";
import GameWon from "../DungeonGrids/GameWon";
import ToolsCarried from "../ToolsCarried";
import ToolsSelect from "../ToolsSelect";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import "./style.css";

class PuzzleLogic extends Component {

    constructor(props) {
        super(props);

        this.state = props.dungeonMap;
    }


    // === RESPONSE TO USER INPUT ===
    // === to move avatar ===
    setClickedSquare = (props) => {
        let clickedID = props;

        this.setState({
            clickedSquare: clickedID,
            moveContinues: true
        })
    }

    // === to throw meat ===
    setMeat = (props) => {
        let clickedID = props;
        let currentLoc = this.state.avaPos;
        let currentSquare = this.state.squareList.find(element => element.id === currentLoc);

        // check the move is valid
        let colCurrent = parseInt(currentLoc.charAt(0), 10);
        let minCol = colCurrent - 2;
        let maxCol = colCurrent + 2;
        let rowCurrent = parseInt(currentLoc.charAt(1), 10);
        let minRow = rowCurrent - 2;
        let maxRow = rowCurrent + 2;
        let colClicked = parseInt(clickedID.charAt(0), 10);
        let rowClicked = parseInt(clickedID.charAt(1), 10);

        let squareLeftID = `${(colCurrent - 1).toString()}${rowCurrent.toString()}`;
        let squareLeft = this.state.squareList.find(element => element.id === squareLeftID);
        let squareRightID = `${(colCurrent + 1).toString()}${rowCurrent.toString()}`;
        let squareRight = this.state.squareList.find(element => element.id === squareRightID);
        let squareAboveID = `${colCurrent.toString()}${(rowCurrent - 1).toString()}`;
        let squareAbove = this.state.squareList.find(element => element.id === squareAboveID);
        let squareBelowID = `${colCurrent.toString()}${(rowCurrent + 1).toString()}`;
        let squareBelow = this.state.squareList.find(element => element.id === squareBelowID);

        
        let newState = this.state;
        // check for walls
        if ((colClicked === (colCurrent - 1) && rowClicked === rowCurrent && currentSquare.leftwall === false) ||
            (colClicked === minCol && rowClicked === rowCurrent && squareLeft.leftwall === false && currentSquare.leftwall === false) ||
            (colClicked === (colCurrent + 1) && rowClicked === rowCurrent && currentSquare.rightwall === false) ||
            (colClicked === maxCol && rowClicked === rowCurrent && squareRight.rightwall === false && currentSquare.rightwall === false) ||
            (rowClicked === (rowCurrent - 1) && colClicked === colCurrent && currentSquare.topwall === false) ||
            (rowClicked === minRow && colClicked === colCurrent && currentSquare.topwall === false && squareAbove.topwall === false) ||
            (rowClicked === (rowCurrent + 1) && colClicked === colCurrent && currentSquare.bottomwall === false) ||
            (rowClicked === maxRow && colCurrent === colClicked && currentSquare.bottomwall === false && squareBelow.bottomwall === false)) {

            // check distance
            if (((colClicked >= minCol && colClicked <= maxCol) && rowClicked === rowCurrent) ||
                ((rowClicked >= minRow && rowClicked <= maxRow) && colClicked === colCurrent)) {
                // put meat in square
                let meatSquare = this.state.squareList.findIndex((element, index) => element.id === clickedID);
                console.log("meatSquare index: ", meatSquare);
                newState.squareList[meatSquare].meat = true;
                let meatIndex = this.state.toolsCarried.findIndex(element => element === "meat");
                console.log("meatIndex: ", meatIndex);
                newState.toolsCarried.splice(meatIndex, 1);
                newState.toolSelected = "";

                // check squares around meat for walls, and then for monsters. If meatSquare contains a pit, monster will be deleted.
                if (newState.squareList[meatSquare].leftwall === false && colClicked > 1) {
                    let meatLeftID = `${(colClicked - 1).toString()}${rowClicked.toString()}`;
                    let meatLeftIndex = newState.squareList.findIndex(element => element.id === meatLeftID);
                    if (newState.squareList[meatLeftIndex].monster === true) {
                        if (newState.squareList[meatSquare].pit === false) {
                            newState.squareList[meatSquare].monster = true;
                            newState.squareList[meatSquare].meat = false;
                        } else if (newState.squareList[meatSquare].pit === true) {
                            newState.squareList[meatSquare].meat = false;
                        }
                        newState.squareList[meatLeftIndex].monster = false;
                    }
                }
                if (newState.squareList[meatSquare].rightwall === false && colClicked < 5) {
                    let meatRightID = `${(colClicked + 1).toString()}${rowClicked.toString()}`;
                    let meatRightIndex = newState.squareList.findIndex(element => element.id === meatRightID);
                    if (newState.squareList[meatRightIndex].monster === true) {
                        if (newState.squareList[meatSquare].pit === false) {
                            newState.squareList[meatSquare].monster = true;
                            newState.squareList[meatSquare].meat = false;
                        } else if (newState.squareList[meatSquare].pit === true) {
                            newState.squareList[meatSquare].meat = false;
                        }
                        newState.squareList[meatRightIndex].monster = false;
                    }
                }
                if (newState.squareList[meatSquare].topwall === false && rowClicked > 1) {
                    let meatTopID = `${(colClicked).toString()}${(rowClicked - 1).toString()}`;
                    let meatTopIndex = newState.squareList.findIndex(element => element.id === meatTopID);
                    if (newState.squareList[meatTopIndex].monster === true) {
                        if (newState.squareList[meatSquare].pit === false) {
                            newState.squareList[meatSquare].monster = true;
                            newState.squareList[meatSquare].meat = false;
                        } else if (newState.squareList[meatSquare].pit === true) {
                            newState.squareList[meatSquare].meat = false;
                        }
                        newState.squareList[meatTopIndex].monster = false;
                    }
                }
                if (newState.squareList[meatSquare].bottomwall === false && rowClicked < 5) {
                    let meatBottomID = `${(colClicked).toString()}${(rowClicked + 1).toString()}`;
                    let meatBottomIndex = newState.squareList.findIndex(element => element.id === meatBottomID);
                    if (newState.squareList[meatBottomIndex].monster === true) {
                        if (newState.squareList[meatSquare].pit === false) {
                            newState.squareList[meatSquare].monster = true;
                            newState.squareList[meatSquare].meat = false;
                        } else if (newState.squareList[meatSquare].pit === true) {
                            newState.squareList[meatSquare].meat = false;
                        }
                        newState.squareList[meatBottomIndex].monster = false;
                    }
                }


                this.setState({
                    ...newState
                })
            } else {
                newState.toolSelected = "";
                this.setState({
                    ...newState
                })
            }
        } else {
            newState.toolSelected = "";
            this.setState({
                ...newState
            })
        }
    }

    // === to lay plank === 
    setPlank = (props) => {
        let clickedID = props;
        let currentLoc = this.state.avaPos;

        // check the move is valid
        let colCurrent = parseInt(currentLoc.charAt(0), 10);
        let minCol = colCurrent - 1;
        let maxCol = colCurrent + 1;
        let rowCurrent = parseInt(currentLoc.charAt(1), 10);
        let minRow = rowCurrent - 1;
        let maxRow = rowCurrent + 1;
        let colClicked = parseInt(clickedID.charAt(0), 10);
        let rowClicked = parseInt(clickedID.charAt(1), 10);
        let currentSquare = this.state.squareList.find(element => element.id === currentLoc);
        let newState = this.state;

        if ((colClicked === minCol && rowClicked === rowCurrent && currentSquare.leftwall === false) ||
            (colClicked === maxCol && rowClicked === rowCurrent && currentSquare.rightwall === false) ||
            (rowClicked === minRow && colClicked === colCurrent && currentSquare.topwall === false) ||
            (rowClicked === maxRow && colClicked === colCurrent && currentSquare.bottomwall === false)) {

            if (colClicked >= (colCurrent - 1) && colClicked <= (colCurrent + 1) && rowClicked >= (rowCurrent - 1) && rowClicked <= (rowCurrent + 1)) {

                let plankSquare = this.state.squareList.findIndex((element, index) => element.id === clickedID);
                console.log("plankSquare: ", plankSquare);
                newState.squareList[plankSquare].plank = true;
                newState.squareList[plankSquare].pit = false;
                let plankIndex = this.state.toolsCarried.findIndex(element => element === "plank");
                console.log("plankIndex: ", plankIndex);
                newState.toolsCarried.splice(plankIndex, 1);
                newState.toolSelected = "";

                this.setState({
                    ...newState
                })
            } else {
                newState.toolSelected = "";
                this.setState({
                    ...newState
                })
            }
        } else {
            newState.toolSelected = "";
            this.setState({
                ...newState
            })
        }
    }

    // === Select Tools During Game ===
    setToolSelected = (props) => {
        let toolSelected = props;
        let newState = this.state;
        newState.toolSelected = toolSelected;
        newState.moveContinues = false;

        this.setState(
            {
                ...newState
            }
        )
    }

    // === Select Tools Before Game ===
    setToolsCarried = (props) => {
        let toolChosen = props;
        let newState = this.state;
        if (newState.toolsCarried[0] === "") {
            newState.toolsCarried[0] = toolChosen;
        } else if (newState.toolsCarried[0] !== "" && newState.toolsCarried[1] === "") {
            newState.toolsCarried[1] = toolChosen;
        } else {
            newState.toolsCarried[0] = "";
            newState.toolsCarried[1] = "";
        }

        newState.moveContinues = false;

        this.setState(
            {
                ...newState
            }
        )
        console.log("toolsCarried in state: ", this.state.toolsCarried);
    }

    // This starts game
    setStartGame = (props) => {
        this.props.setMovesTaken(false);
        let startGame = props;
        let newState = this.state;
        newState.gameStarted = startGame;
        this.setState(
            {
                ...newState
            }
        )
    }


    // === Move Avatar Based On User Clicks ===

    componentDidUpdate(prevProps, prevState) {

        var avaPos = this.state.avaPos;
        let clickedSquare = this.state.clickedSquare;

        console.log((clickedSquare) + " clicked");

        // check the move is valid
        let colCurrent = avaPos.charAt(0);
        let rowCurrent = avaPos.charAt(1);
        let colClicked = clickedSquare.charAt(0);
        let rowClicked = clickedSquare.charAt(1);

        // check to see if the square clicked is in a column or row of the current square
        if (this.state.gameStarted === true && this.state.moveContinues === true && (colClicked === colCurrent || rowClicked === rowCurrent)) {

            // check if column is passable

            if (colClicked === colCurrent) {
                // for going up
                if (rowClicked < rowCurrent) {
                    this.moveUp(rowCurrent, rowClicked, avaPos);
                }
                // for going down
                else if (rowClicked > rowCurrent) {
                    this.moveDown(rowCurrent, rowClicked, avaPos);
                }
            }
            // check if row is passable
            else if (rowClicked === rowCurrent) {

                // for going right
                if (colClicked > colCurrent) {
                    this.moveRight(colCurrent, colClicked, avaPos);
                }
                //for going left
                else if (colClicked < colCurrent) {
                    this.moveLeft(colCurrent, colClicked, avaPos);
                }
            }
        }
        else if (this.state.moveContinues === true && !(colClicked === colCurrent || rowClicked === rowCurrent)) {
            alert("Invalid Move");
        }

    }

// Move avatar up
    moveUp = (rowCurrent, rowClicked, avaMove) => {
        // for each square moving up the grid, as row decreases, check if passable. 
        // Start on current square in case of wall in that square.
        // Note that avaMove starts with the value of avaPos from the calling function.
        let moveContinues = this.state.moveContinues;
        for (var i = rowCurrent; i >= rowClicked; i--) {
           
            if (moveContinues === true) {
                avaMove = avaMove.charAt(0) + i; // column doesn't change, row will be i
                
                let eatenByMonster = this.checkMonster(avaMove.charAt(0), i);
                console.log("eatenByMonster: ", eatenByMonster);
                if (eatenByMonster === true) {
                    moveContinues = false;
                }

                let currentSquare = this.state.squareList.find(element => element.id === avaMove);

                if (currentSquare.pit === true && currentSquare.plank === false) {
                    console.log("You fell into a pit. No-one lowers a basket. Game over.");
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    moveContinues = false;
                } else if (currentSquare.treasure === true && eatenByMonster === false) {
                    console.log("You got the treasure! But will it make you happy?");
                    this.changeAvatarLocation(avaMove);
                    this.setState((state) => {
                        return { gameWon: true, gameContinues: false, moveContinues: false }
                    });
                    moveContinues = false;
                } else if (currentSquare.topwall === true) {
                    console.log("There's a wall, so you stop at ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                } else if (i == rowClicked) {
                    console.log("You made it unimpeded to ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                }
            }
        }
    }

    // Move Avatar down
    moveDown = (rowCurrent, rowClicked, avaMove) => {

        let moveContinues = this.state.moveContinues;
        for (var i = rowCurrent; i <= rowClicked; i++) {
            
            if (moveContinues === true) {
                avaMove = avaMove.charAt(0) + i; // column doesn't change, row will be i
                let eatenByMonster = this.checkMonster(avaMove.charAt(0), i);
                console.log("eatenByMonster: ", eatenByMonster);
                if (eatenByMonster === true) {
                    moveContinues = false;
                }

                let currentSquare = this.state.squareList.find(element => element.id === avaMove);

                if (currentSquare.pit === true && currentSquare.plank === false) {
                    console.log("You fell into a pit. No-one lowers a basket. Game over.");
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    moveContinues = false;
                } else if (currentSquare.treasure === true && eatenByMonster === false) {
                    console.log("You got the treasure! But will it make you happy?");
                    this.changeAvatarLocation(avaMove);
                    this.setState((state) => {
                        return { gameWon: true, gameContinues: false, moveContinues: false }
                    });
                    moveContinues = false;
                } else if (currentSquare.bottomwall === true) {
                    console.log("There's a wall, so you stop at ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                    return;

                } else if (i == rowClicked) {
                    console.log("You made it unimpeded to ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                }

            }
        }
    }
// Move Avatar right
    moveRight = (colCurrent, colClicked, avaMove) => {

        let moveContinues = this.state.moveContinues;
        for (var i = colCurrent; i <= colClicked; i++) {

            if (moveContinues === true) {
                avaMove = i + avaMove.charAt(1); // column is i, row doesn't change
                
                let eatenByMonster = this.checkMonster(i, avaMove.charAt(1));
                if (eatenByMonster === true) {
                    moveContinues = false;
                }

                let currentSquare = this.state.squareList.find(element => element.id === avaMove);

                if (currentSquare.pit === true && currentSquare.plank === false) {
                    console.log("You fell into a pit. No-one lowers a basket. Game over.");
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    moveContinues = false;

                } else if (currentSquare.treasure === true && eatenByMonster === false) {
                    console.log("You got the treasure! But will it make you happy?");
                    this.changeAvatarLocation(avaMove);
                    this.setState((state) => {
                        return { gameWon: true, gameContinues: false, moveContinues: false }
                    });
                    moveContinues = false;
                } else if (currentSquare.rightwall === true) {

                    console.log("There's a wall, so you stop at ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
 
                } else if (i == colClicked) {
                    console.log("You made it unimpeded to ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;

                }


            }
        }
    }

    // Move Avatar Left
    moveLeft = (colCurrent, colClicked, avaMove) => {
       
        let moveContinues = this.state.moveContinues;

        for (var i = colCurrent; i >= colClicked; i--) {
            console.log("moveRight for loop " + i + " moveContinues: ", moveContinues);

            if (moveContinues === true) {
                avaMove = i + avaMove.charAt(1); // column is i, row doesn't change
                
                let eatenByMonster = this.checkMonster(i, avaMove.charAt(1));
                if (eatenByMonster === true) {
                    moveContinues = false;
                }

                let currentSquare = this.state.squareList.find(element => element.id === avaMove);

                if (currentSquare.pit === true && currentSquare.plank === false) {
                    console.log("You fell into a pit. No-one lowers a basket. Game over.");
                    this.setState((state) => {
                        return { gameContinues: false, moveContinues: false };
                    });
                    moveContinues = false;
                } else if (currentSquare.treasure === true && eatenByMonster === false) {
                    console.log("You got the treasure! But will it make you happy?");
                    this.changeAvatarLocation(avaMove);
                    this.setState((state) => {
                        return { gameWon: true, gameContinues: false, moveContinues: false }
                    });
                    moveContinues = false;
                } else if (currentSquare.leftwall === true) {

                    console.log("There's a wall, so you stop at ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                } else if (i == colClicked) {
                    console.log("You made it unimpeded to ", avaMove);
                    this.changeAvatarLocation(avaMove);
                    moveContinues = false;
                }

            }
        }

    }


// Checks if there is a monster beside a square the avatar moves to.
    checkMonster = (colCurrent, rowCurrent) => {
        // define squares to be checked
        console.log("==checkMonster==");
        let colLeft = colCurrent;
        colLeft--;
        let squareLeft = `${colLeft}${rowCurrent}`;
        let colRight = colCurrent;
        colRight++;
        let squareRight = `${colRight}${rowCurrent}`;
        let rowAbove = rowCurrent;
        rowAbove--;
        let squareAbove = `${colCurrent}${rowAbove}`;
        let rowBelow = rowCurrent;
        rowBelow++;
        let squareBelow = `${colCurrent}${rowBelow}`;
        let squareThis = `${colCurrent}${rowCurrent}`;
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

    // Change avatar location in state
    changeAvatarLocation = (avaMove) => {
        console.log("===changeAvatarLocation=== avaMove: ", avaMove);

        let newState = this.state.squareList; 
        for (let i = 0; i < newState.length; i++) {
            if (newState[i].id == avaMove) {
                newState[i].avatar = true;
                this.props.setMovesTaken(true);
               
            } else {
                newState[i].avatar = false;
               
            }

        }

        this.setState(() => ({
            squareList: newState,
            clickedSquare: "",
            avaPos: avaMove,
            moveContinues: false
        }),
            () => console.log("State after moving avatar: ", this.state));

    }

    // This renders the navbar based on whether the game is in play
    renderNavbar = () => {
        if (this.state.gameStarted === false) {
            return <div className="nav-grid">
                <div className="dungeon-title">{this.props.title}</div>
                <div className="dungeon-difficulty">Level: {this.props.difficulty}</div>
                <div className="startGamebtn" onClick={() => this.setStartGame(true)}>Start Dungeon</div>
            </div>
        }
        else {
            return <div className="nav-grid">
                <div className="dungeon-title">{this.props.title}</div>
                <div className="dungeon-difficulty">Level: {this.props.difficulty}</div>
                <div className="startGamebtn" onClick={() => this.props.restart(true)}> Restart Dungeon </div>
            </div>
        }
    }

    // This renders the gamegrid required for the users move
    renderPage = () => {
        if (this.state.gameContinues === true) {
            switch (this.state.toolSelected) {
                case "meat":
                    console.log("GameGridMeat rendered");
                    return <GameGridMeat
                        setMeat={this.setMeat}
                        squareList={this.state.squareList}
                    />;
                    
                case "plank":
                    console.log("GameGridPlank rendered");
                    return <GameGridPlank
                        setPlank={this.setPlank}
                        squareList={this.state.squareList}
                    />;
                    
                default:
                    console.log("GameGrid rendered");
                    return <GameGrid
                        setClickedSquare={this.setClickedSquare}
                        squareList={this.state.squareList}
                    />;
                    
            }
        } else if (this.state.gameContinues === false) {
            // props will be map. If PuzzleLogic is rendered through CreatePageLogic, a second prop verify will be included. 
            // verify will run conditionally when game ends.
            console.log("gameover running, props: ", this.props);
            this.props.updateStats(this.state.gameWon);
            if (this.props.verify && this.state.gameContinues === false) {
                this.props.verify(this.state.gameWon);
            }

            if (this.state.gameWon === false) {
                return <GameLost
                    squareList={this.state.squareList}
                />;
            } else if (this.state.gameWon === true) {
                return <GameWon
                    squareList={this.state.squareList}
                />;
            }
        } else {
            return <HomePage />;
        }
    };

    // This renders the tools option before game starts, giving the chance to choose tools
    renderTools = () => {
        if (this.state.gameStarted === false) {
            return <div>

                <Row><Col>
                    <ToolsSelect
                        toolChosen={this.setToolsCarried}
                        startGame={this.setStartGame}
                    />
                </Col></Row><Row><Col>
                    <ToolsCarried
                        tools={this.state.toolsCarried}
                        toolSelected={this.setToolSelected}
                    />
                </Col></Row>
            </div>
        } else {
            return <div>
                <Row><Col>
                    <ToolsCarried
                        tools={this.state.toolsCarried}
                        toolSelected={this.setToolSelected}
                    />
                </Col></Row>

            </div>
        }
    }

    render() {

        return (
            <Container>
                <Row><Col>
                    {this.renderNavbar()}
                </Col></Row>
                <Row><Col>
                    <div className="playgame-grid">
                        <div>

                            {this.renderPage()}

                        </div>
                        <div>
                        {this.state.gameContinues === true &&
                            (<div>
                                {this.renderTools()}
                            </div>)
                        }
                        <Row><Col>
                    <div className="moves-taken">Moves Taken: {this.props.moveCount}</div>
                </Col></Row>
                    </div>
                    </div>
                </Col></Row>
                <Row></Row>
            </Container>

        );
    }
}

PuzzleLogic.contextType = AuthContext;
export default PuzzleLogic;