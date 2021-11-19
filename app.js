let origBoard = Array.from(Array(9).keys());
const humanPlayer = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 11.328 11.328" xml:space="preserve">
        <g>
        <path style="fill:#030104;" d="M11.145,9.085L7.723,5.664l3.422-3.421c0.243-0.244,0.243-0.64,0-0.883L9.967,0.183
        c-0.244-0.244-0.64-0.244-0.883,0L5.662,3.604l-3.42-3.421c-0.244-0.244-0.639-0.244-0.883,0L0.183,1.36
        c-0.243,0.244-0.243,0.639,0,0.883l3.421,3.421L0.183,9.085c-0.243,0.244-0.243,0.639,0,0.883l1.177,1.178
        c0.244,0.243,0.639,0.243,0.883,0l3.42-3.422l3.422,3.422c0.243,0.243,0.639,0.243,0.883,0l1.178-1.178
        C11.389,9.724,11.389,9.329,11.145,9.085z"/>
        </g>
    </svg>
`;
const computerPlayer = `
        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 94 94" xml:space="preserve">
            <g><g>
            <path d="M47,94C21.084,94,0,72.916,0,47S21.084,0,47,0s47,21.084,47,47S72.916,94,47,94z M47,12.186
                c-19.196,0-34.814,15.618-34.814,34.814c0,19.195,15.618,34.814,34.814,34.814c19.195,0,34.814-15.619,34.814-34.814
                C81.814,27.804,66.195,12.186,47,12.186z"/>
            </g></g>
        </svg>`;

let finishedGame = false;
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
const endGameElem = document.querySelector(".end_game");

startGame();

function startGame() {
    endGameElem.style.display = "none";
    console.log(origBoard);
    for(let i = 0; i < cells.length ; i++) {
        cells[i].addEventListener("click" , function(e) {
            if(!finishedGame){
                if(origBoard.includes(+e.target.id)) {
                    e.target.innerHTML  = humanPlayer;
                    cells[i].dataset.player = "X";
                    let selectedCell = origBoard.indexOf(+e.target.id);
                    origBoard.splice(selectedCell , 1);
    
                    if(checkWinState('human')[0]){
                        endGameElem.style.display = "flex";
                        endGameElem.textContent = "Human Won!";
                        finishedGame = true;
                    } else if(origBoard.length >= 1) {
                        computerPlayerMove();
                    }
    
                } else {
                    alert("Incorrect Move!");
                }
            } else {
                alert("Game Finished!");
            }
        });
    }
}

function computerPlayerMove() {
    let selectPointIndex = getRandomItemFromArray(0 , origBoard.length);
    document.getElementById(origBoard[selectPointIndex]).innerHTML  = computerPlayer;
    cells[origBoard[selectPointIndex]].dataset.player = "O";
    origBoard.splice(selectPointIndex , 1);
    if(checkWinState('computer')[0]){
        endGameElem.style.display = "flex";
        endGameElem.textContent = "Computer Won!";
        finishedGame = true;
    }
}

// replay game
function restartGame() {
    endGameElem.style.display = "none";
    cells.forEach(cell => {
        cell.textContent = " ";
        delete cell.dataset.player;
    });
    origBoard = Array.from(Array(9).keys());
    finishedGame = false;
}

// check which players won!
function checkWinState(player){
    let isWin = false , winComb = [];
    player = (player === 'human') ? "X" : "O";
    for(let i = 0 ; i < winCombination.length ; i++){
        let setCount = 0;
        let combination = winCombination[i];
        for(let j = 0 ; j < combination.length ; j++){
            let cell = document.getElementById(combination[j]);
            if(cell.dataset.player !== "" && cell.dataset.player === player){
                ++setCount;
                continue;
            } else {
                break;
            }
        }

        if(setCount === 3) {
            winComb = combination;
            isWin = true;
            break;
        }
    }

    return [isWin , winComb];
}


// get random integer include min and not include max and between range
function getRandomItemFromArray(min , max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}