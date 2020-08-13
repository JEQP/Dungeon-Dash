import React, { Component } from "react";
import GameGrid from "../DungeonGrids/GameGrid";
import BlankMap from "../../utils/BlankMap.json";
import CreateMapOptions from "../CreateMapOptions";
import Button from 'react-bootstrap/Button';
import PuzzleLogic from "../PuzzleLogic";

class CreatePuzzleLogic extends Component {
    constructor(props) {
        super(props);
        let initialMap = JSON.stringify(BlankMap);

        this.state = {
            dungeon: JSON.parse(initialMap),
            selectedFeature: "",
            clickedSquare: "",
            avatarDeployed: false,
            treasureDeployed: false,
            verified: false,
            testing: false,
            movesTaken: 0
        }

        // this.handleTesting = this.handleTesting.bind(this);
    }

    // This will set clickedSquare in state with the id of the element clicked by the user
    setClickedSquare = (props) => {
        if (this.state.testing !== true) {
            let clickedID = props;
            if (this.state.selectedFeature !== "") {
                this.setState({
                    clickedSquare: clickedID,
                    verified: false
                })
            }
        }
    }

    // This sets the clickedFeature to the tile image clicked in createMapOptions
    setSelectedFeature = (props) => {
        let clickedFeature = props;
        console.log("props in setSelectedFeature: ", props);

        this.setState({
            selectedFeature: clickedFeature
        })
    }

    // Once the user successfully completes their map, this will change verified, to let it be saved to database
    setVerified = (props) => {
        console.log("setVerified run: ", props);
        this.setState({
            verified: props,
            testing: false
        })
    }


    // take selectedFeature and clickedSquare from state. If they are both non-blank, update state based on these
    componentDidUpdate() {
        let selectedFeature = this.state.selectedFeature;
        let clickedSquare = this.state.clickedSquare;
        let avatarDeployed = this.state.avatarDeployed;
        let treasureDeployed = this.state.treasureDeployed;

        if (selectedFeature !== "" && clickedSquare !== "" && this.state.testing !== true) {
            console.log("createPuzzleLogic componentDidUpdate if loop run");
            let dungeon = this.state.dungeon;
            console.log("dungeon: ", dungeon);
            console.log("selected feature: ", selectedFeature);
            console.log("clickedSquare: ", clickedSquare);

            let colClicked = parseInt(clickedSquare.charAt(0), 10);
            let rowClicked = parseInt(clickedSquare.charAt(1), 10);
            let squareLeftIndex = dungeon.squareList.findIndex((element, index) => element.id === `${(colClicked - 1).toString()}${rowClicked.toString()}`);
            let squareAboveIndex = dungeon.squareList.findIndex((element, index) => element.id === `${(colClicked).toString()}${(rowClicked - 1).toString()}`);
            let squareIndex = dungeon.squareList.findIndex((element, index) => element.id === clickedSquare);

            if (selectedFeature === "pitWallsNone") {
                dungeon.squareList[squareIndex].classList = "square pitWallsNone";
                dungeon.squareList[squareIndex].pit = true;
                dungeon.squareList[squareIndex].leftwall = false;
                dungeon.squareList[squareIndex].topwall = false;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = false;
                }
                if (rowClicked > 1) {
                    dungeon.squareList[squareAboveIndex].bottomwall = false;
                }
            } else if (selectedFeature === "pitWallLeft") {
                dungeon.squareList[squareIndex].classList = "square pitWallLeft";
                dungeon.squareList[squareIndex].pit = true;
                dungeon.squareList[squareIndex].leftwall = true;
                dungeon.squareList[squareIndex].topwall = false;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = true;
                }
                if (rowClicked > 1) {
                    dungeon.squareList[squareAboveIndex].bottomwall = false;
                }
            } else if (selectedFeature === "pitWallLeftTop") {
                dungeon.squareList[squareIndex].classList = "square pitWallLeftTop";
                dungeon.squareList[squareIndex].pit = true;
                dungeon.squareList[squareIndex].leftwall = true;
                dungeon.squareList[squareIndex].topwall = true;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = true;
                }
                if (rowClicked > 1) {
                    dungeon.squareList[squareAboveIndex].bottomwall = true;
                }
            } else if (selectedFeature === "pitWallTop") {
                dungeon.squareList[squareIndex].classList = "square pitWallTop";
                dungeon.squareList[squareIndex].pit = true;
                dungeon.squareList[squareIndex].leftwall = false;
                dungeon.squareList[squareIndex].topwall = true;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = false;
                }
                if (rowClicked > 1) {
                    dungeon.squareList[squareAboveIndex].bottomwall = true;
                }
            } else if (selectedFeature === "wallLeft") {
                dungeon.squareList[squareIndex].classList = "square wallLeft";
                dungeon.squareList[squareIndex].leftwall = true;
                dungeon.squareList[squareIndex].topwall = false;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = true;
                }
                if (rowClicked > 1) {
                    dungeon.squareList[squareAboveIndex].bottomwall = false;
                }
            } else if (selectedFeature === "wallLeftTop") {
                dungeon.squareList[squareIndex].classList = "square wallLeftTop";
                dungeon.squareList[squareIndex].leftwall = true;
                dungeon.squareList[squareIndex].topwall = true;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = true;
                }
                if (rowClicked > 1) {
                    dungeon.squareList[squareAboveIndex].bottomwall = true;
                }
            } else if (selectedFeature === "wallTop") {
                dungeon.squareList[squareIndex].classList = "square wallTop";
                dungeon.squareList[squareIndex].leftwall = false;
                dungeon.squareList[squareIndex].topwall = true;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = false;
                }
                if (rowClicked > 1) {
                    dungeon.squareList[squareAboveIndex].bottomwall = true;
                }

            } else if (selectedFeature === "monster") {
                if (dungeon.squareList[squareIndex].monster === false) {
                    dungeon.squareList[squareIndex].monster = true;
                } else {
                    dungeon.squareList[squareIndex].monster = false;
                }
            } else if (selectedFeature === "avatar") {
                if (dungeon.squareList[squareIndex].avatar === false && avatarDeployed === false) {
                    dungeon.squareList[squareIndex].avatar = true;
                    dungeon.avaPos = clickedSquare;
                    this.setState({
                        avatarDeployed: true
                    });
                } else {
                    dungeon.squareList[squareIndex].avatar = false;
                    this.setState({
                        avatarDeployed: false
                    });
                }
            } else if (selectedFeature === "treasure") {
                if (dungeon.squareList[squareIndex].treasure === false && treasureDeployed === false) {
                    dungeon.squareList[squareIndex].treasure = true;
                    this.setState({
                        treasureDeployed: true
                    });
                } else {
                    dungeon.squareList[squareIndex].treasure = false;
                    this.setState({
                        treasureDeployed: false
                    });
                }
            }


            selectedFeature = "";
            clickedSquare = "";
            this.setState({
                clickedSquare: "",
                selectedFeature: ""
            })
            console.log("selected feature: ", selectedFeature);
            console.log("clickedSquare: ", clickedSquare);
        }
    }

    // This is run through PuzzleLogic
    setMovesTaken = (props) => {
        let moveCount = this.state.movesTaken;
        if (props === true) {
            moveCount++;
            this.setState({ movesTaken: moveCount });
        } else {
            this.setState({ movesTaken: 0 });
        }
    }

    // blank function to not break PuzzleLogic component.
    updateStats = (props) => {
        console.log(props);
    }

    // Allows user to end a play through of their dungeon
    restartDungeon = (props) => {
        this.setState({
            testing: false
        })
    }

    // Renders the appropriate game grid based on whether the user is creating or testing their map
    renderGameGrid = () => {
        console.log("testing: ", this.state.testing);

        if (this.state.testing === false) {
            return <div><div>
                <CreateMapOptions
                    setSelectedFeature={this.setSelectedFeature}
                />
            </div>
                <div>
                    <GameGrid
                        setClickedSquare={this.setClickedSquare}
                        squareList={this.state.dungeon.squareList}
                    />
                </div></div>
        } else if (this.state.testing === true) {
            let testMap = JSON.stringify(this.state.dungeon);
            console.log("testMap: ", testMap);

            return <PuzzleLogic
                dungeonMap={JSON.parse(testMap)}
                verify={this.setVerified}
                restart={this.restartDungeon}
                updateStats={this.updateStats}
                title={this.props.title}
                difficulty={"Testing"}
                moveCount={this.state.movesTaken}
                setMovesTaken={this.setMovesTaken} />
        }
    }

    handleTesting = () => {
        this.setState(state => ({
            testing: true
        }));
    }

    // Reset Dungeon to blank
    resetDungeon = () => {
        let initialMap = JSON.stringify(BlankMap);

        this.setState({
            dungeon: JSON.parse(initialMap)
        })
    }
    // Renders either the verify or save button
    renderButton = () => {
        console.log("verified: ", this.state.verified);
        if (this.state.verified === false) {
            return <div><Button variant="danger" size="lg" block onClick={() => this.handleTesting()}>Verify Dungeon</Button>
                <Button variant="warning" size="lg" block onClick={() => this.resetDungeon()}>Reset Dungeon</Button></div>
        } else if (this.state.verified === true) {
            return <div><Button variant="primary" size="lg" block onClick={() => this.props.stringifyDungeonMap(JSON.stringify(this.state.dungeon))}>Save Dungeon</Button>
                <Button variant="warning" size="lg" block onClick={() => this.resetDungeon()}>Reset Dungeon</Button></div>
        }
    }

    render() {
        console.log("createPuzzleLogic state: ", this.state);
        return (
            <section>
                {this.renderGameGrid()}
                {this.renderButton()}
            </section>
        );
    }
}

export default CreatePuzzleLogic;