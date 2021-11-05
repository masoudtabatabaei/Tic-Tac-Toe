let origBoard;
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

// get random integer include min and max and between range
function getRandomItemFromArray(min , max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}