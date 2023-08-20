var minions = ["Bob","Stuart","Kevin","Otto","Purple","Gru","Banana"];
var board = [];
var score = 0;
var rows = 8;
var cols = 8;

var sfx = [new Audio("./assets/baaa.mp3"), new Audio("./assets/yay.mp3"), new Audio("./assets/ta-da-29.mp3")];

var currTile;
var otherTile;

window.onload = function() {
    startGame();
    
    window.setInterval(function(){
        mashMinion();
        slideMinion();
        generateMinion();
        countDown();
    }, 100);
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./assets/" + minions[Math.floor(Math.random() * minions.length)] + ".png"
            
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}
function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    //if either chosen tile or tile that is to be swaped is blank - no swapping occurs
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        //Check to make sure there are 3 minions in a row/column to crush
        let validMove = checkMinions();
        if (!validMove) {
            score -= 20;
        }
    }
}

function mashMinion() {
    mashFour();
    mashThree();
    document.getElementById("score").innerText = score;
}

function mashFour() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols-3; c++) {
            let minionType = "NA";
            let minion1 = board[r][c];
            let minion2 = board[r][c+1];
            let minion3 = board[r][c+2];
            let minion4 = board[r][c+3];
            for (let i = 0; i < minions.length; i++) {
                if (minion1.src.includes(minions[i])) {
                    minionType = minions[i]
                    break;
                }
            }
            if (minion2.src.includes(minionType) && minion3.src.includes(minionType) && minion4.src.includes(minionType)) {
                if (minion1.src.includes("_4") || minion2.src.includes("_4") || minion3.src.includes("_4")) {
                    score += 65;
                }
                else {
                    score += 50;
                }
                minion1.src = "./assets/blank.png";
                minion2.src = "./assets/blank.png";
                minion3.src = "./assets/" + minionType + "_4.png";
                minion4.src = "./assets/blank.png";
                sfx[Math.floor(Math.random() * sfx.length)].play();
            }
        }
    }

    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows-3; r++) {
            let minionType = "NA";
            let minion1 = board[r][c];
            let minion2 = board[r+1][c];
            let minion3 = board[r+2][c];
            let minion4 = board[r+3][c];
            for (let i = 0; i < minions.length; i++) {
                if (minion1.src.includes(minions[i])) {
                    minionType = minions[i]
                    break;
                }
            }
            if (minion2.src.includes(minionType) && minion3.src.includes(minionType) && minion4.src.includes(minionType)) {
                if (minion1.src.includes("_4") || minion2.src.includes("_4") || minion3.src.includes("_4")) {
                    score += 65;
                }
                else {
                    score += 50;
                }
                minion1.src = "./assets/blank.png";
                minion2.src = "./assets/blank.png";
                minion3.src = "./assets/blank.png";
                minion4.src = "./assets/" + minionType + "_4.png";
                sfx[Math.floor(Math.random() * sfx.length)].play();
            }
        }
    }
}

function mashThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols-2; c++) {
            let minionType = "NA";
            let minion1 = board[r][c];
            let minion2 = board[r][c+1];
            let minion3 = board[r][c+2];
            for (let i = 0; i < minions.length; i++) {
                if (minion1.src.includes(minions[i])) {
                    minionType = minions[i]
                    break;
                }
            }
            if (minion2.src.includes(minionType) && minion3.src.includes(minionType)) {
                if (minion1.src.includes("_4") || minion2.src.includes("_4") || minion3.src.includes("_4")) {
                    score += 40;
                }
                else {
                    score += 25;
                }
                minion1.src = "./assets/blank.png";
                minion2.src = "./assets/blank.png";
                minion3.src = "./assets/blank.png";
                sfx[Math.floor(Math.random() * sfx.length)].play();
            }
        }
    }

    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows-2; r++) {
            let minionType = "NA";
            let minion1 = board[r][c];
            let minion2 = board[r+1][c];
            let minion3 = board[r+2][c];for (let i = 0; i < minions.length; i++) {
                if (minion1.src.includes(minions[i])) {
                    minionType = minions[i]
                    break;
                }
            }
            if (minion2.src.includes(minionType) && minion3.src.includes(minionType)) {
                if (minion1.src.includes("_4") || minion2.src.includes("_4") || minion3.src.includes("_4")) {
                    score += 40;
                }
                else {
                    score += 25;
                }
                minion1.src = "./assets/blank.png";
                minion2.src = "./assets/blank.png";
                minion3.src = "./assets/blank.png";
                sfx[Math.floor(Math.random() * sfx.length)].play();
            }
        }
    }
}

function checkMinions() {
    //Check for three minions in a row 
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols-2; c++) {
            let minionType = "NA";
            let minion1 = board[r][c];
            let minion2 = board[r][c+1];
            let minion3 = board[r][c+2];
            for (let i = 0; i < minions.length; i++) {
                if (minion1.src.includes(minions[i])) {
                    minionType = minions[i]
                    break;
                }
            }
            if (minion2.src.includes(minionType) && minion3.src.includes(minionType)) {
                return true;
            }
        }
    }
    //check for three minions in a column
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows-2; r++) {
            let minionType = "NA";
            let minion1 = board[r][c];
            let minion2 = board[r+1][c];
            let minion3 = board[r+2][c];for (let i = 0; i < minions.length; i++) {
                if (minion1.src.includes(minions[i])) {
                    minionType = minions[i]
                    break;
                }
            }
            if (minion2.src.includes(minionType) && minion3.src.includes(minionType)) {
                return true;
            }
        }
    }
    return false
}

function slideMinion(){
    for (let c=0; c< cols; c++){
        let ind = rows - 1;
        for(let r = cols-1; r>=0; r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind-= 1;
            }
        }
        for (let r = ind; r>=0;r--) {
            board[r][c].src = "./assets/blank.png";
        }
    }
}

function generateMinion() {
    for (let c = 0; c < cols; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./assets/" + minions[Math.floor(Math.random() * minions.length)] + ".png"
        }
    }
}

function countDown() {
    let currTime = parseFloat(document.getElementById("timer").innerText);
    currTime -= 0.1;
    if (currTime <= 0) {
        gameOver();
    }
    document.getElementById("timer").innerText = Math.round(currTime * 10) / 10
}

function gameOver() {
    alert("Game Over!\nYou scored " + score.toString() + " points!");
    document.location.href = "./gameover.html";
}