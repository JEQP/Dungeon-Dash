import React, { Component, setState } from "react";
import GameGrid from "../GameGrid";
import AuthContext from "../../utils/AuthContext";
import BlankMap from "../../utils/BlankMap.json";
import CreateMapOptions from "../CreateMapOptions";
import Button from 'react-bootstrap/Button';

class CreatePuzzleLogic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dungeon: BlankMap,
            selectedFeature: "",
            clickedSquare: "",
            avatarDeployed: false,
            treasureDeployed: false
        }
    }

    setClickedSquare = (props) => {
        let clickedID = props;
        console.log("props in setClickedSquare: ", props);
        if (this.state.selectedFeature !== "") {
            this.setState({
                clickedSquare: clickedID,
            })
        }
    }

    setSelectedFeature = (props) => {
        let clickedFeature = props;
        console.log("props in setSelectedFeature: ", props);

        this.setState({
            selectedFeature: clickedFeature
        })
    }


    // take selectedFeature and clickedSquare from state. If they are both non-blank, update state based on these
    componentDidUpdate() {
        let selectedFeature = this.state.selectedFeature;
        let clickedSquare = this.state.clickedSquare;
        let avatarDeployed = this.state.avatarDeployed;
        let treasureDeployed = this.state.treasureDeployed;

        if (selectedFeature !== "" && clickedSquare !== "") {

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
            } else if (selectedFeature === "pitWallLeft") {
                dungeon.squareList[squareIndex].classList = "square pitWallLeft";
                dungeon.squareList[squareIndex].pit = true;
                dungeon.squareList[squareIndex].leftwall = true;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = true;
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
                dungeon.squareList[squareIndex].topwall = true;
                if (rowClicked > 1) {
                    dungeon.squareList[squareAboveIndex].bottomwall = true;
                }
            } else if (selectedFeature === "wallLeft") {
                dungeon.squareList[squareIndex].classList = "square wallLeft";
                dungeon.squareList[squareIndex].leftwall = true;
                if (colClicked > 1) {
                    dungeon.squareList[squareLeftIndex].rightwall = true;
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
                dungeon.squareList[squareIndex].topwall = true;
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



    render() {
        console.log("createPuzzleLogic state: ", this.state);
        return (
            <section>
                <CreateMapOptions
                    setSelectedFeature={this.setSelectedFeature}
                />
                <GameGrid
                    setClickedSquare={this.setClickedSquare}
                    squareList={this.state.dungeon.squareList}
                />
                <Button variant="primary" size="lg" block onClick={() => this.props.stringifyDungeonMap(JSON.stringify(this.state.dungeon))}>Save Map</Button>
            </section>
        );
    }
}

export default CreatePuzzleLogic;