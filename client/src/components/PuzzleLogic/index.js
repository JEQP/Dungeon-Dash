import React, { Component, setState } from "react";
import GameGrid from "../GameGrid";
import testingMap from "../../testingMap.json";
import AuthContext from "../../utils/AuthContext";


class PuzzleLogic extends Component {

    constructor(props) {
        // necessary line 
        super(props);
        // Don't call this.setState() here!
        // FIND OUT HOW TO REMOVE TESINGMAP FROM THE STATE, THEN CHANGE ALL CALLS TO STATE
        this.state =  testingMap ;
        // this.handleClick = this.handleClick.bind(this);
    }

    setClickedSquare = (props) => {
        let clickedID = props;
        console.log("props in setClickedSquare: ", props);
        this.setState({
            clickedSquare: clickedID
        })
    }

    //     {/* GridContext contains the state of the grid, including classes, location of avatar, and assumedly location of monster.
    //     Props contains the id of the square that was clicked. */}
    // {/* avaPos is props.clickedSquare */ }
    // $(`#` + avaPos).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');

    // function to move avatar based on clicks

    componentDidUpdate() {
        // var avaPos = "";
        // // find current position of avatar, and set to avaPos. 
        // this.state.testingMap.squareList.map((item, index) => (
        //     item.avatar === true &&
        //     (avaPos = item.id)
        // ))

        // If we clear the avatar now it will update the state, which will run componentDidUpdate again
        // but there will be no avatar. 

        // clearAvatar = (index) => {
        //     let newState = this.state;
        //     newState.squareList[index].avatar=false;
        //     this.setState({
        //         newState
        //     })
        // }


        // avaPos = this.state.squareList.find(id => id.avatar === true);

        // avaPos = avaPos.id;

        var avaPos = this.state.avaPos;
        console.log("initial location id: " + avaPos);

        let clickedSquare = this.state.clickedSquare;

        console.log((clickedSquare) + " clicked");

        // setting avaPos with map. 

        // console.log("avaPos after click: " + avaPos);


        // check the move is valid
        let colCurrent = avaPos.charAt(0);
        let rowCurrent = avaPos.charAt(1);
        let colClicked = clickedSquare.charAt(0);
        let rowClicked = clickedSquare.charAt(1);
        console.log("colCurrent: " + colCurrent + " rowCurrent: " + rowCurrent + " avaPos: " + avaPos);
        console.log("colClicked: " + colClicked + " rowClicked: " + rowClicked);

        // check to see if the square clicked is in a column or row of the current square
        if (colClicked === colCurrent || rowClicked === rowCurrent) {

            // check if column is passable

            if (colClicked === colCurrent) {
                // for going up
                if (rowClicked < rowCurrent) {
                    console.log("if then up - RowClicke " + rowClicked + "rowCurrent " + rowCurrent);
                    this.moveUp(rowCurrent, rowClicked, avaPos);
                }
                // for going down
                else if (rowClicked > rowCurrent) {
                    console.log("else if then down - RowClicke " + rowClicked + "rowCurrent " + rowCurrent);
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
        else {
            alert("Invalid Move");
        }


    }

    moveUp = (rowCurrent, rowClicked, avaMove) => {
        console.log("moveUpsquares: " + rowCurrent + " " + rowClicked + "id: " + avaMove);
        // for each square moving up the grid, as row decreases, check if passable. 
        // Start on current square in case of wall in that square.
        // Note that avaMove starts with the value of avaPos from the calling function.

        for (var i = rowCurrent; i >= rowClicked; i--) {

            // $(`#` + avaMove).html(''); // clear current avatar image -- not how the image is displayed now
            avaMove = avaMove.charAt(0) + i; // column doesn't change, row will be i
            let currentSquareClassList = this.state.squareList.find(element => element.id === avaMove);
            currentSquareClassList = currentSquareClassList.classList;
            // convert currentSquareClassList to array
            currentSquareClassList = currentSquareClassList.split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);

            this.checkMonster(avaMove.charAt(0), i);

            currentSquareClassList.forEach( (index, item) => {
                if (item === "pit") {
                    console.log("GAME OVER");
                    this.javascript_abort();
                    return;
                }
                else if (item === "topWall") {
                    console.log("journey ended");
                    console.log("avaMove topWallstop: " + avaMove);

                    this.changeAvatarLocation(avaMove);
                    this.javascript_abort();
                    return;

                }
                else if (i == rowClicked) {
                    console.log("journey ended");
                    console.log("avaMove final up: " + avaMove);
                    this.changeAvatarLocation(avaMove);
                    this.javascript_abort();
                    return;
                }
            });
        }
    }

    moveDown = (rowCurrent, rowClicked, avaMove) => {
        console.log("moveDownsquares: " + rowCurrent + " " + rowClicked + "id: " + avaMove);

        for (var i = rowCurrent; i <= rowClicked; i++) {
            // $(`#` + avaMove).html(''); // clear current avatar image
            avaMove = avaMove.charAt(0) + i; // column doesn't change, row will be i
            // var currentSquareClassList = $("#" + avaMove).attr("class").split(/\s+/);
            let currentSquareClassList = this.state.squareList.find(element => element.id === avaMove);
            currentSquareClassList = currentSquareClassList.classList;
            currentSquareClassList = currentSquareClassList.split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);

            this.checkMonster(avaMove.charAt(0), i);

            currentSquareClassList.forEach( (index, item) => {
                if (item === "pit") {
                    console.log("GAME OVER");
                    this.javascript_abort();
                    return;
                }
                else if (item === "topWall") {
                    console.log("journey ended");
                    avaMove = avaMove.charAt(0) + (i - 1); // because it will be in the square above
                    this.changeAvatarLocation(avaMove);
                    // $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    this.javascript_abort();
                    return;

                }
                else if (i == rowClicked) {
                    console.log("journey ended");
                    console.log("avaMove final down: " + avaMove);
                    this.changeAvatarLocation(avaMove);
                    // $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    this.javascript_abort();
                    return;

                }
            });
        }

    }

    moveRight = (colCurrent, colClicked, avaMove) => {

        for (var i = colCurrent; i <= colClicked; i++) {
            // $(`#` + avaMove).html(''); // clear current avatar image
            avaMove = i + avaMove.charAt(1); // column is i, row doesn't change
            console.log("avaMove in right for loop: " + avaMove);

            // var currentSquareClassList = $("#" + avaMove).attr("class").split(/\s+/);
            let currentSquareClassList = this.state.squareList.find(element => element.id === avaMove);
            currentSquareClassList = currentSquareClassList.classList;
            currentSquareClassList = currentSquareClassList.split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);

            this.checkMonster(i, avaMove.charAt(1));

            currentSquareClassList.forEach( (index, item) => {
                if (item === "pit") {
                    console.log("GAME OVER");
                    this.javascript_abort();
                    return;
                }
                else if (item === "leftWall") {

                    console.log("journey ended");
                    avaMove = (i - 1) + avaMove.charAt(1); // because it will be in the square on the left
                    // $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    this.changeAvatarLocation(avaMove);
                    this.javascript_abort();
                    return;
                }
                else if (i == colClicked) {
                    console.log("journey ended");
                    console.log("avaMove final right: " + avaMove);
                    // $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    this.changeAvatarLocation(avaMove);
                    this.javascript_abort();
                    return;
                }

            });
        }

    }

    moveLeft = (colCurrent, colClicked, avaMove) => {

        for (var i = colCurrent; i >= colClicked; i--) {
            // $(`#` + avaMove).html(''); // clear current avatar image
            avaMove = i + avaMove.charAt(1); // column is i, row doesn't change

            // var currentSquareClassList = $("#" + avaMove).attr("class").split(/\s+/);

            let currentSquareClassList = this.state.squareList.find(element => element.id === avaMove);
            currentSquareClassList = currentSquareClassList.classList;
            // convert currentSquareClassList to array
            currentSquareClassList = currentSquareClassList.split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);

            this.checkMonster(i, avaMove.charAt(1));

            currentSquareClassList.forEach( (index, item) => {
                if (item === "pit") {
                    console.log("GAME OVER");
                    this.javascript_abort();
                    return;
                }
                else if (item === "leftWall") {

                    console.log("journey ended");
                    // $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    this.changeAvatarLocation(avaMove);
                    this.javascript_abort();
                    return;
                }
                else if (i == colClicked) {
                    console.log("journey ended");
                    console.log("avaMove final right: " + avaMove);
                    // $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    this.changeAvatarLocation(avaMove);
                    this.javascript_abort();
                    return;
                }
            });
        }

    }



    checkMonster = (colCurrent, rowCurrent) => {
        // define squares to be checked
        let colLeft = colCurrent;
        colLeft--;
        let squareLeft = `${colLeft}` + `${rowCurrent}`;
        console.log("squareLeft: ", squareLeft);
        let colRight = colCurrent;
        colRight++;
        let squareRight = `${colRight}` + `${rowCurrent}`;
        console.log("squareRight: " + squareRight);
        let rowAbove = rowCurrent;
        rowAbove--;
        let squareAbove = `${colCurrent}` + `${rowAbove}`;
        console.log("squareAbove: " + squareAbove);
        let rowBelow = rowCurrent;
        rowBelow++;
        let squareBelow = `${colCurrent}` + `${rowBelow}`;
        console.log("squareBelow: " + squareBelow);
        let squareThis = `${colCurrent}` + `${rowCurrent}`;
        console.log("squareThis: ", squareThis);


        // checking square left
        if (colCurrent > 1) {

            // let checkSquareClassList = $("#" + squareLeft).attr("class").split(/\s+/);

            let checkSquareClassList = this.state.squareList.find(element => element.id === squareLeft);
            checkSquareClassList = checkSquareClassList.classList;
            // convert checkSquareClassList to array
            checkSquareClassList = checkSquareClassList.split(/\s+/);
            console.log("check right checkSquareClassList: " + checkSquareClassList);

            // $.each(checkSquareClassList, function (index, item) {

            console.log("check left col row: " + colCurrent + " " + rowCurrent);
            console.log("check left: ", checkSquareClassList.includes("monster"));
            if (checkSquareClassList.includes("monster")) {
                let checkSquareThisClassList = this.state.squareList.find(element => element.id === squareThis);
                checkSquareThisClassList = checkSquareThisClassList.classList;
                // convert checkSquareThisClassList to array
                checkSquareThisClassList = checkSquareThisClassList.split(/\s+/);
                // let checkSquareThisClassList = $('#' + squareThis).attr("class").split(/\s+/);
                if (checkSquareThisClassList.includes("leftWall")) {
                    console.log("The Wall Saved You");

                }
                else {
                    console.log("The Monster Ate You");
                    this.javascript_abort();
                    //code to move monster icon
                }
            }
            // });
        }
        //checking square right 
        if (colCurrent < 5) {

            // let checkSquareClassList = $("#" + squareRight).attr("class").split(/\s+/);

            let checkSquareClassList = this.state.squareList.find(element => element.id === squareRight);
            checkSquareClassList = checkSquareClassList.classList;
            // convert checkSquareClassList to array
            checkSquareClassList = checkSquareClassList.split(/\s+/);

            console.log("check right checkSquareClassList: ", checkSquareClassList);

            // $.each(checkSquareClassList, function (index, item) {
            //     console.log("check left col row: " + colCurrent + " " + rowCurrent);
            // console.log("check right class: ", $("#" + (colCurrent + 1) + rowCurrent).attr("class"))
            // console.log("check right: ", $("#" + (colCurrent + 1) + rowCurrent).attr("class").split(/\s+/).includes("monster"));
            if (checkSquareClassList.includes("monster")) {
                // $.each(checkSquareClassList, function (index, item) {
                if (checkSquareClassList.includes("leftWall")) {
                    console.log("The Wall Saved You");
                }
                else {
                    console.log("The Monster Ate You");
                    this.javascript_abort();
                    //code to move monster icon
                }
                // });
            }
            // });
        }

        // checking square above
        if (rowCurrent > 1) {
            // let checkSquareClassList = $("#" + squareAbove).attr("class").split(/\s+/);
            let checkSquareClassList = this.state.squareList.find(element => element.id === squareAbove);
            checkSquareClassList = checkSquareClassList.classList;
            // convert checkSquareClassList to array
            checkSquareClassList = checkSquareClassList.split(/\s+/);

            console.log("check above checkSquareClassList: ", checkSquareClassList);
            console.log("check left col row: " + colCurrent + " " + rowCurrent);
            // console.log("check above: ", $("#" + squareAbove).attr("class").split(/\s+/).includes("monster"));
            if (checkSquareClassList.includes("monster")) {
                // let checkSquareThisClassList = $('#' + squareThis).attr("class").split(/\s+/);
                let checkSquareThisClassList = this.state.squareList.find(element => element.id === squareThis);
                checkSquareThisClassList = checkSquareThisClassList.classList;
                // convert checkSquareThisClassList to array
                checkSquareThisClassList = checkSquareThisClassList.split(/\s+/);

                if (checkSquareThisClassList.includes("topWall")) {
                    console.log("The Wall Saved You");

                }
                else {
                    console.log("The Monster Ate You");
                    this.javascript_abort();
                    //code to move monster icon
                }
            }
        }

        // checking square below
        if (rowCurrent < 5) {
            // let checkSquareClassList = $("#" + squareBelow).attr("class").split(/\s+/);
            let checkSquareClassList = this.state.squareList.find(element => element.id === squareBelow);
            checkSquareClassList = checkSquareClassList.classList;
            // convert checkSquareClassList to array
            checkSquareClassList = checkSquareClassList.split(/\s+/);

            console.log("check above checkSquareClassList: ", checkSquareClassList);

            console.log("check below: ", checkSquareClassList.includes("monster"));

            if (checkSquareClassList.includes("monster")) {

                if (checkSquareClassList.includes("topWall")) {
                    console.log("The Wall Saved You");

                }
                else {
                    console.log("The Monster Ate You");
                    this.javascript_abort();
                    //code to move monster icon
                }
            }
        }
    }

    changeAvatarLocation = (avaMove) => {
        let newState = this.state.squareList.map((item, index) =>
            item.id === this.state.avaPos &&
            (newState.squareList[index].avatar = false)
        );
        newState = newState.squareList.map((item, index) =>
            item.id === avaMove &&
            (newState.squareList[index].avatar = true)
        );
        newState.avaPos = avaMove;
        this.setState({
            newState
        })
    }

    javascript_abort = () => {
        throw new Error('This is not an error. This is just to abort javascript');
    }

    render() {
        console.log("render state: ", this.state);
        return (

            <GameGrid
                setClickedSquare={this.setClickedSquare}
                squareList={this.state.squareList}
            />


        );
    }
}


PuzzleLogic.contextType = AuthContext;
export default PuzzleLogic;