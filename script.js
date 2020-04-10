"use strict";
// up and down are done, left and right are not. HOWEVER
// avaPos resets to 15 when the loop is finished. Cannot get colCurrent, rowCurrent to not be 15

$(document).ready(function () {

    // $(`#` + avaPos).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');


    var avaPos = $('#avaIcon').parent().attr("id"); // location of avatar
    console.log("initial location id: " + avaPos);

    // function to move avatar based on clicks
    $(".square").click(function (event) {
        event.stopPropagation;
        console.log($(this).attr("id") + " clicked");
        console.log("avaPos after click: " + avaPos);

        // check the move is valid
        var idClicked = $(this).attr("id"); // first number is column, second number is row

        var colCurrent = avaPos.charAt(0);
        var rowCurrent = avaPos.charAt(1);

        console.log("colCurrent: " + colCurrent + " rowCurrent: " + rowCurrent + " avaPos: " + avaPos);

        //Split all the classes of clicked location into an array
        var colClicked = idClicked.charAt(0);
        var rowClicked = idClicked.charAt(1);

        console.log("colClicked: " + colClicked + " ||| rowClicked: " + rowClicked);

        // check to see if the square clicked is in a column or row of the current square
        if (colClicked === colCurrent || rowClicked === rowCurrent) {

            // check if column is passable

            if (colClicked === colCurrent) {
                // for going up
                if (rowClicked < rowCurrent) {
                    console.log("if then up - RowClicke " + rowClicked + "rowCurrent " + rowCurrent);
                    moveUp(rowCurrent, rowClicked, avaPos);
                }
                // for going down
                else if (rowClicked > rowCurrent) {
                    console.log("else if then down - RowClicke " + rowClicked + "rowCurrent " + rowCurrent);
                    moveDown(rowCurrent, rowClicked, avaPos);
                }
            }
            // check if row is passable
            else if (rowClicked === rowCurrent) {

                // for going right
                if (colClicked > colCurrent) {
                    console.log("if then right - colClicked: " + colClicked + " colCurrent: " + colCurrent);
                    moveRight(colCurrent, colClicked, avaPos);
                }
                //for going left
                else if (colClicked < colCurrent) {
                    console.log("if then left - colClicked: " + colClicked + " colCurrent: " + colCurrent);
                    moveLeft(colCurrent, colClicked, avaPos);
                }
            }

            // $(`#` + avaPos).html('');

            // avaPos = $(this).attr("id");

            // $(`#` + avaPos).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
        }
        else {
            console.log("class: " + $(this).attr("class"));
            alert("Invalid Move");
        }


    })

    function moveUp(rowCurrent, rowClicked, avaMove) {
        console.log("moveUpsquares: " + rowCurrent + " " + rowClicked + "id: " + avaMove);
        // for each square moving up the grid, as row decreases, check if passable. Start on current square in case of wall in that square


        for (var i = rowCurrent; i >= rowClicked; i--) {
            $(`#` + avaMove).html(''); // clear current avatar image
            avaMove = avaMove.charAt(0) + i; // column doesn't change, row will be i
            var currentSquareClassList = $("#" + avaMove).attr("class").split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);
            checkMonster(avaMove.charAt(0), i);
            $.each(currentSquareClassList, function (index, item) {
                if (item === "pit") {
                    console.log("GAME OVER");
                    return;
                }
                else if (item === "topWall" || i == rowClicked) {
                    console.log("journey ended");

                    console.log("avaMove final up: " + avaMove);
                    $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    avaPos = avaMove;
                    return;
                }
            })
        }
    }

    function moveDown(rowCurrent, rowClicked, avaMove) {
        console.log("moveDownsquares: " + rowCurrent + " " + rowClicked + "id: " + avaMove);

        for (var i = rowCurrent; i <= rowClicked; i++) {
            $(`#` + avaMove).html(''); // clear current avatar image
            avaMove = avaMove.charAt(0) + i; // column doesn't change, row will be i
            var currentSquareClassList = $("#" + avaMove).attr("class").split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);
            checkMonster(avaMove.charAt(0), i);
            $.each(currentSquareClassList, function (index, item) {
                if (item === "pit") {
                    console.log("GAME OVER");
                    return;
                }
                else if (item === "topWall") {
                    console.log("journey ended");
                    avaMove = avaMove.charAt(0) + i - 1; // because it will be in the square above
                    $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    avaPos = avaMove;
                    return;

                }
                else if (i == rowClicked) {
                    console.log("journey ended");
                    console.log("avaMove final down: " + avaMove);
                    $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    avaPos = avaMove;
                    return;

                }
            });
        }
    }

    function moveRight(colCurrent, colClicked, avaMove) {

        for (var i = colCurrent; i <= colClicked; i++) {
            $(`#` + avaMove).html(''); // clear current avatar image
            avaMove = i + avaMove.charAt(1); // column is i, row doesn't change
            console.log("avaMove in right for loop: " + avaMove);

            var currentSquareClassList = $("#" + avaMove).attr("class").split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);
            checkMonster(i, avaMove.charAt(1));
            $.each(currentSquareClassList, function (index, item) {
                if (item === "pit") {
                    console.log("GAME OVER");
                    return;
                }
                else if (item === "leftWall") {

                    console.log("journey ended");
                    avaMove = (i - 1) + avaMove.charAt(1); // because it will be in the square on the left
                    $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    avaPos = avaMove;
                    return;
                }
                else if (i == colClicked) {
                    console.log("journey ended");
                    console.log("avaMove final right: " + avaMove);
                    $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    avaPos = avaMove;
                    return;
                }

            });
        }
    }

    function moveLeft(colCurrent, colClicked, avaMove) {

        for (var i = colCurrent; i >= colClicked; i--) {
            $(`#` + avaMove).html(''); // clear current avatar image
            avaMove = i + avaMove.charAt(1); // column is i, row doesn't change

            var currentSquareClassList = $("#" + avaMove).attr("class").split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);
            checkMonster(i, avaMove.charAt(1));
            $.each(currentSquareClassList, function (index, item) {
                if (item === "pit") {
                    console.log("GAME OVER");
                    return;
                }
                else if (item === "leftWall") {

                    console.log("journey ended");
                    $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    avaPos = avaMove;
                    return;
                }
                else if (i == colClicked) {
                    console.log("journey ended");
                    console.log("avaMove final right: " + avaMove);
                    $(`#` + avaMove).html('<img id="avaIcon" src="assets/images/avatar.png"></img>');
                    avaPos = avaMove;
                    return;
                }
            });
        }
    }



    function checkMonster(colCurrent, rowCurrent) {
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

            let checkSquareClassList = $("#" + squareLeft).attr("class").split(/\s+/);
            // $.each(checkSquareClassList, function (index, item) {

            console.log("check left col row: " + colCurrent + " " + rowCurrent);
            console.log("check left: ", $("#" + squareLeft).attr("class").split(/\s+/).includes("monster"));
            if (checkSquareClassList.includes("monster")) {
                let checkSquareThisClassList = $('#' + squareThis).attr("class").split(/\s+/);
                if (checkSquareThisClassList.includes("leftWall")) {
                    console.log("The Wall Saved You");

                }
                else {
                    console.log("The Monster Ate You");
                    //code to move monster icon
                }
            }
            // });
        }
        //checking square right !!!!!This version seems to have worked. 
        if (colCurrent < 5) {

            let checkSquareClassList = $("#" + squareRight).attr("class").split(/\s+/);
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
                    //code to move monster icon
                }
                // });
            }
            // });
        }

        // checking square above
        if (rowCurrent > 1) {
            let checkSquareClassList = $("#" + squareAbove).attr("class").split(/\s+/);
            console.log("check left col row: " + colCurrent + " " + rowCurrent);
            console.log("check above: ", $("#" + squareAbove).attr("class").split(/\s+/).includes("monster"));
            if (checkSquareClassList.includes("monster")) {
                let checkSquareThisClassList = $('#' + squareThis).attr("class").split(/\s+/);
                if (checkSquareThisClassList.includes("topWall")) {
                    console.log("The Wall Saved You");

                }
                else {
                    console.log("The Monster Ate You");
                    //code to move monster icon
                }
            }
        }

        // checking square below
        if (rowCurrent < 5) {
            let checkSquareClassList = $("#" + squareBelow).attr("class").split(/\s+/);
            console.log("check below: ", $("#" + squareBelow).attr("class").split(/\s+/).includes("monster"));
            if (checkSquareClassList.includes("monster")) {

                if (checkSquareClassList.includes("topWall")) {
                    console.log("The Wall Saved You");

                }
                else {
                    console.log("The Monster Ate You");
                    //code to move monster icon
                }
            }
        }
    }





});


