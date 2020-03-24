
var avPos = "loc-21"; // location of avatar
// THE FLAW IS IN currentSquareClassList - it just take the first square it finds with currentClass, but it needs to check which one it is. So also need to check other row or column.

$(document).ready(function () {

    $(`#` + avPos).html('<img src="assets/images/avatar.png"></img>');

    // function to move avatar based on clicks
    $(".square").click(function (event) {
        event.stopPropagation;
        console.log($(this).attr("id") + " clicked");

        // check the move is valid
        // Split all the classes of current location into an array
        var colCurrent = "";
        var rowCurrent = "";
        var currentClassList = $('#' + avPos).attr('class').split(/\s+/);
        console.log("currentClassList: " + JSON.stringify(currentClassList));

        $.each(currentClassList, function (index, item) {
            if (item.charAt(0) === 'c') {
                colCurrent = item;
            }
            else if (item.charAt(0) === 'r') {
                rowCurrent = item;
            }
        });
        console.log("colCurrent: " + colCurrent + "||| rowCurrent: " + rowCurrent);

        //Split all the classes of clicked location into an array
        var colClicked = "";
        var rowClicked = "";
        var clickedClassList = $(this).attr('class').split(/\s+/);
        console.log("clickedClassList: " + JSON.stringify(clickedClassList));

        $.each(clickedClassList, function (index, item) {
            if (item.charAt(0) === 'c') {
                colClicked = item;
            }
            else if (item.charAt(0) === 'r') {
                rowClicked = item;
            }
        });
        console.log("colClicked: " + colClicked + "||| rowClicked: " + rowClicked);

        // check to see if the square clicked is in a column or row of the current square
        if (colClicked === colCurrent || rowClicked === rowCurrent) {

            // check if column is passable

            if (colClicked === colCurrent) {
                let square1 = rowCurrent.charAt(1); // get the number part of the rows
                let square2 = rowClicked.charAt(1);
                console.log("squares: " + square1 + " " + square2);

                // for going up
                if (square2 < square1) {
                    moveUp(square1, square2);
                }
                // for going down
                else if (square2 > square1) {
                    moveDown(square1, square2);
                }
            }
            // check if row is passable
            else if (rowClicked === rowCurrent) {
                let square1 = colCurrent.charAt(1); // get the number part of the columns
                let square2 = colClicked.charAt(1);
                console.log("squares: " + square1 + " " + square2);

                // for going right
                if (square2 > square1) {
                    moveRight(square1, square2);
                }
                else if (square2 < square1) {
                    moveLeft(square1, square2);
                }
            }

            // $(`#` + avPos).html('');

            // avPos = $(this).attr("id");

            // $(`#` + avPos).html('<img src="assets/images/avatar.png"></img>');
        }
        else {
            console.log("class: " + $(this).attr("class"));
            alert("Invalid Move");
        }


    })

    function moveUp(square1, square2) {
        console.log("moveUpsquares: " + square1 + " " + square2);
        for (var i = square1; i >= square2; i--) {
            let currentSquare = "r" + i;
            console.log("currentSquare: " + currentSquare);

            var currentSquareClassList = $("." + currentSquare).attr("class").split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);
            var colHere = "";
            var rowHere = "";
            $.each(currentSquareClassList, function (index, item) {
                if (item === "pit") {
                    console.log("GAME OVER");
                    return;
                }
                else if (item === "topWall" || i == square2) {
                    console.log("journey ended");
                    $.each(currentSquareClassList, function (index, item) {
                        if (item.charAt(0) === 'c') {
                            colHere = item;
                            console.log("colHere: " + colHere);
                        }
                        else if (item.charAt(0) === 'r') {
                            rowHere = item;
                            console.log("rowHere: " + rowHere);
                        }

                    });
                    console.log("avPos in loops: " + avPos);
                    $(`#` + avPos).html('');
                    avPos = $(`.${colHere}.${rowHere}`).attr("id"); // selects all elements with both classes
                    console.log("hereID: " + JSON.stringify(avPos));

                    $(`#` + avPos).html('<img src="assets/images/avatar.png"></img>');

                    return;
                }
            })
        }
    }

    function moveDown(square1, square2) {
        console.log("moveDownsquares: " + square1 + " " + square2);

        for (var i = square1; i <= square2; i++) {
            let currentSquare = "r" + i;
            console.log("currentSquare: " + currentSquare);

            var currentSquareClassList = $("." + currentSquare).attr("class").split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);
            var colHere = "";
            var rowHere = "";
            $.each(currentSquareClassList, function (index, item) {
                if (item === "pit") {
                    console.log("GAME OVER");
                    return;
                }
                else if (item === "topWall") {
                    $.each(currentSquareClassList, function (index, item) {
                        if (item.charAt(0) === 'c') {
                            colHere = item;
                            console.log("colHere: " + colHere);
                        }
                        else if (item.charAt(0) === 'r') {
                            rowHere = 'r' + item.charAt(1) - 1; // This is because they will stop in the square above the one with the wall
                            console.log("rowHere: " + rowHere);
                        }
                    });
                    console.log("avPos in down: " + avPos);
                    $(`#` + avPos).html('');
                    avPos = $(`.${colHere}.${rowHere}`).attr("id"); // selects all elements with both classes
                    console.log("hereID: " + JSON.stringify(avPos));

                    $(`#` + avPos).html('<img src="assets/images/avatar.png"></img>');
                    return;
                }
                else if (i == square2) {
                    $.each(currentSquareClassList, function (index, item) {
                        if (item.charAt(0) === 'c') {
                            colHere = item;
                            console.log("colHere: " + colHere);
                        }
                        else if (item.charAt(0) === 'r') {
                            rowHere = item;
                            console.log("rowHere: " + rowHere);
                        }

                    });
                    console.log("avPos in down: " + avPos);
                    $(`#` + avPos).html('');
                    avPos = $(`.${colHere}.${rowHere}`).attr("id"); // selects all elements with both classes
                    console.log("hereID: " + JSON.stringify(avPos));

                    $(`#` + avPos).html('<img src="assets/images/avatar.png"></img>');
                    return;
                }


            });
        }
    }

    function moveRight(square1, square2) {
        console.log("MoveRightSquares: " + square1 + " " + square2);

        for (var i = square1; i <= square2; i++) {
            let currentSquare = "c" + i;
            console.log("currentSquare: " + currentSquare);

            var currentSquareClassList = $("." + currentSquare).attr("class").split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);
            var colHere = "";
            var rowHere = "";
            $.each(currentSquareClassList, function (index, item) {
                if (item === "pit") {
                    console.log("GAME OVER");
                    return;
                }
                else if (item === "leftWall") {
                    $.each(currentSquareClassList, function (index, item) {
                        if (item.charAt(0) === 'c') {
                            colHere = 'c' + item.charAt(1) - 1; // this is because they will stop in the square to the left of the wall
                            console.log("colHere: " + colHere);
                        }
                        else if (item.charAt(0) === 'r') {
                            rowHere = item;
                            console.log("rowHere: " + rowHere);
                        }
                    });
                    console.log("avPos in right: " + avPos);
                    $(`#` + avPos).html('');
                    avPos = $(`.${colHere}.${rowHere}`).attr("id"); // selects all elements with both classes
                    console.log("hereID: " + JSON.stringify(avPos));

                    $(`#` + avPos).html('<img src="assets/images/avatar.png"></img>');
                    return;
                }
                else if (i == square2) {
                    $.each(currentSquareClassList, function (index, item) {
                        if (item.charAt(0) === 'c') {
                            colHere = item;
                            console.log("colHere: " + colHere);
                        }
                        else if (item.charAt(0) === 'r') {
                            rowHere = item;
                            console.log("rowHere: " + rowHere);
                        }
                    });
                    console.log("avPos in down: " + avPos);
                    $(`#` + avPos).html('');
                    avPos = $(`.${colHere}.${rowHere}`).attr("id"); // selects all elements with both classes
                    console.log("hereID: " + JSON.stringify(avPos));

                    $(`#` + avPos).html('<img src="assets/images/avatar.png"></img>');
                    return;
                }
            });

        }

    }

    function moveLeft(square1, square2) {
        console.log("moveLeftSquares: " + square1 + " " + square2);
        for (var i = square1; i >= square2; i--) {
            let currentSquare = "c" + i;
            console.log("currentSquare: " + currentSquare);
            var currentSquareClassList = $("." + currentSquare).attr("class").split(/\s+/);
            console.log("currentSquareClassList: " + currentSquareClassList);
            var colHere = "";
            var rowHere = "";
            $.each(currentSquareClassList, function (index, item) {
                if (item === "pit") {
                    console.log("GAME OVER");
                    return;
                }
                else if (item === "leftWall" || i === square2) {
                    console.log("journey ended");
                    $.each(currentSquareClassList, function (index, item) {
                        if (item.charAt(0) === 'c') {
                            colHere = item;
                            console.log("colHere: " + colHere);
                        }
                        else if (item.charAt(0) === 'r') {
                            rowHere = item;
                            console.log("rowHere: " + rowHere);
                        }
                    });
                    console.log("avPos in loops: " + avPos);
                    $(`#` + avPos).html('');
                    avPos = $(`.${colHere}.${rowHere}`).attr("id"); // selects all elements with both classes
                    console.log("hereID: " + JSON.stringify(avPos));
                    $(`#` + avPos).html('<img src="assets/images/avatar.png"></img>');

                    return;
                }
            })
        }
    }


});
