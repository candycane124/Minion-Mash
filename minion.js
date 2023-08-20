var minions = ["Bob","Stuart","Kevin","Otto","Purple","Jorge","Banana"];
var board = [];
var score = 0;
var rows = 8;
var cols = 8;

var currTile;
var otherTile;

window.onload = function() {
    startGame();
    
    window.setInterval(function(){
        mashMinion();
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
    }
}

function mashMinion() {
    mashThree();
}

function mashThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols-2; c++) {
            let minion1 = board[r][c];
            let minion2 = board[r][c+1];
            let minion3 = board[r][c+2];
            if (minion1.src == minion2.src && minion2.src == minion3.src && !minion1.src.includes("blank")) {
                minion1.src = "./assets/blank.png";
                minion2.src = "./assets/blank.png";
                minion3.src = "./assets/blank.png";
            }
        }
    }

    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows-2; r++) {
            let minion1 = board[r][c];
            let minion2 = board[r+1][c];
            let minion3 = board[r+2][c];
            if (minion1.src == minion2.src && minion2.src == minion3.src && !minion1.src.includes("blank")) {
                minion1.src = "./assets/blank.png";
                minion2.src = "./assets/blank.png";
                minion3.src = "./assets/blank.png";
            }
        }
    }
}