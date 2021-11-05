const origBoard = origBoard = Array.from(Array(9).keys());
const humanPlayer = "X";
const computerPlayer = "O";
const winCombination = [
    [0,1,2] ,
    [3,4,5] ,
    [6,7,8] ,
    [0,3,6] ,
    [1,4,7] ,
    [2,5,8] ,
    [0,4,8] ,
    [2,4,6]
];

const cells = document.querySelectorAll(".cell");

startGame();

function startGame() {
    document.querySelector(".end_game").style.display = "none";
    console.log(origBoard);
    for(let i = 0; i < cells.length ; i++) {
        cells[i].addEventListener("click" , function(e) {
            if(origBoard.includes(+e.target.id)) {
                e.target.innerText = humanPlayer;
                let selectedCell = origBoard.indexOf(+e.target.id);
                origBoard.splice(selectedCell , 1);

                if(origBoard.length >= 1) {
                    computerPlayerMove();
                }
            } else {
                alert("Incorrect Move!");
            }
        });
    }
}

function computerPlayerMove() {
    let selectPointIndex = getRandomItemFromArray(0 , origBoard.length);
    document.getElementById(origBoard[selectPointIndex]).innerText = computerPlayer;
    origBoard.splice(selectPointIndex , 1);
}


// get random integer include min and not include max and between range
function getRandomItemFromArray(min , max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}