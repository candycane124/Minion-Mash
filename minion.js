var minions = ["Bob","Stuart","Kevin","Otto","Purple","Jorge","Banana"];
var board = [];
var score = 0;

window.onload = function() {
    startGame();
}

function startGame() {
    for (let r = 0; r < 6; r++) {
        let row = [];
        for (let c = 0; c < 6; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./assets/" + minions[Math.floor(Math.random() * minions.length)] + ".png"

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}