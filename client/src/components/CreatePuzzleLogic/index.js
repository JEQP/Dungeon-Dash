import React, { Component, setState } from "react";
import GameGrid from "../GameGrid";
import AuthContext from "../../utils/AuthContext";
import BlankMap from "../../utils/BlankMap.json";
import CreateMapOptions from "../CreateMapOptions";

class CreatePuzzleLogic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: BlankMap,
            selectedFeature: "",
            clickedSquare: ""
        }
    }

    setClickedSquare = (props) => {
        let clickedID = props;
        console.log("props in setClickedSquare: ", props);

        this.setState({
            clickedSquare: clickedID,
        })
    }

    setSelectedFeature = (props) => {
        let clickedFeature = props;
        console.log("props in setSelectedFeature: ", props);

        this.setState({
            selectedFeature: clickedFeature
        })
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
                squareList={this.state.map.squareList}
            />
            </section>
        );
    }
}

export default CreatePuzzleLogic;