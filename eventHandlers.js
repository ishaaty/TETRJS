let ctx = canvas.getContext("2d");
let currentColor = document.querySelector("#currentColor");
let clearBtn = document.querySelector("#clear");
let pointTag = document.querySelector("#points")
let lineTag = document.querySelector("#lines")
let paletteIn = sessionStorage.getItem("first");
let palette;
let color = "black";

let gridList = [];
let tempList = [];

let restart = false;
let block;
let score = 0;
let lines = 0;

// order: square, Lblock, Jblock, Tblock, Sblock, Zblock, line
if (paletteIn == "pastel") {
    palette = ["#faf873", "#ffda70", "#92b9fc", "#ffa6ed", "#95ff85", "#ff8293", "#8cfaff"];
} else if (paletteIn == "pink") {
    palette = ["#ffecee", "#ffe0e6", "#ffd4de", "#ffc9d6", "#febdce", "#feb1c6", "#fea5be"];
} else if (paletteIn == "blue") {
    palette = ["#dbedff", "#b6daff", "#a4d1ff", "#91c7ff", "#7fbeff", "#6cb4ff", "#47a0ff"];
} else if (paletteIn == "gray") {
    palette = ["#ffffff", "#d5d5d5", "#aaaaaa", "#808080", "#555555", "#2b2b2b", "#1a1a1a"];
} else if (paletteIn == "vri") {
    palette = ["#f3eaf9", "#f1e3fc", "#ecd6fc", "#e9ccfc", "#e6c1ff", "#e1b7ff", "#dbaaff"];
} else {
    palette = ["#FEFB34", "#FFC82E", "#0341AE", "#DD0AB2", "#53DA3F", "#FD3F59", "#01EDFA"];
}


// create canvas
for (let y = 0; y <= canvas.height; y += 40) {
    for (let x = 0; x <= canvas.width; x += 40) {
        let pixel = new Pixel(x, y);
        tempList.push(pixel);
    }
    gridList.push(tempList);
    tempList = [];
}

let pixelGrid = gridList[0][0]; // contains coordinates (0,0)
console.log(gridList[0][0].color);
pixelGrid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);

// movement based on input
window.addEventListener("keydown", function (e) {
    if (e.repeat) {
        return;
    }
    if (e.key == "ArrowDown" || e.key == "s") {
        score += block.slowDrop();
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        for (let i = 0; i < block.pixelList.length; i++){
            if (block.pixelList[i].xCoordinate - 40 < 0 || gridList[block.pixelList[i].yCoordinate/40][block.pixelList[i].xCoordinate/40-1].isAvailable == false){
                return;
            }
        }
        block.moveLeft();
    }
    if (e.key == "ArrowRight" || e.key == "d") {
        for (let i = 0; i < block.pixelList.length; i++){
            if (block.pixelList[i].xCoordinate + 40 >= 400 || block.pixelList[i].yCoordinate >= canvas.height || gridList[block.pixelList[i].yCoordinate/40][block.pixelList[i].xCoordinate/40+1].isAvailable == false){
                return;
            }
        }
        block.moveRight();
    }
    if (e.key == "ArrowUp" || e.key == "w") {
        block.rotate();
        pixelGrid.changeColor(block.color);
        block.colorBlock();
    }
    if (e.key == " ") {
        score += block.quickDrop();
    }
});

window.addEventListener("load", function () {
    console.log(palette)
    // creating the grid
    createBlock(pixelGrid);
    // create next block
    v = setInterval(function () {
        if (restart) {
            // console.log(block.pixelList[block.pixelList.length - 1])
            if (block.pixelList[0].yCoordinate - block.height <= 0) {
                ctx.font = "50px Fantasy";
                ctx.fillStyle = "white";
                ctx.fillText("GAME OVER", 90, 300);
                clearInterval();
            }
            else {
                // score += 40;
                pointTag.innerHTML = "Score: " + score;
                lineTag.innerHTML = "Lines: " + lines;
                restart = false;
                createBlock(pixelGrid);
            }
        }
    }, 0);
});


function createBlock(pixelGrid) {
    let v;
    // randomly pick a block type
    let rand = Math.floor(Math.random() * 7);
    // console.log(palette[0]);
    switch (rand) {
        case 0:
            block = new Square(160, 40, pixelGrid, palette[0]);
            break;
        case 1:
            block = new LBlock(160, 40, pixelGrid, palette[1]);
            break;
        case 2:
            block = new JBlock(160, 40, pixelGrid, palette[2]);
            break;
        case 3:
            block = new TBlock(160, 40, pixelGrid, palette[3]);
            break;
        case 4:
            block = new ZBlock(160, 40, pixelGrid, palette[4]);
            break;
        case 5:
            block = new SBlock(160, 40, pixelGrid, palette[5]);
            break;
        case 6:
            block = new Line(160, 40, pixelGrid, palette[6]);
    }

    // make block move down passively
    v = setInterval(function () {
        block.moveDown();
        
        for (let i = 0; i < block.pixelList.length; i++){
            if (block.pixelList[i].yCoordinate == 800 || gridList[block.pixelList[i].yCoordinate/40+1][block.pixelList[i].xCoordinate/40].isAvailable == false){
                pixelGrid.changeColor(block.color);
                block.colorBlock();
                for (let j = 0; j < block.pixelList.length; j++){
                    gridList[block.pixelList[j].yCoordinate/40][block.pixelList[j].xCoordinate/40].changeAvailability();
                    gridList[block.pixelList[j].yCoordinate/40][block.pixelList[j].xCoordinate/40].changeColor(block.color);
                }
                restart = true;
                clearRow();
                clearInterval(v);
                break;
            }
        }
    }, 150);

}

function clearRow(){
    // let check = false;
    for (let h = 0; h < 2; h++){
        for (let i = gridList.length-1; i >= 0; i--){
            check = false;
            for (let j = 0; j < gridList[0].length-1; j++){
                if (gridList[i][j].isAvailable){
                    check = true;
                    break;
                }
            }
            if (!check){
                for (let k = i; k > 0; k--){
                    for (let j = 0; j < gridList[0].length; j++){
                        let pix = gridList[k-1][j];
                        gridList[k][j] = pix;
                        gridList[k][j].yCoordinate += 40;
                        pixelGrid.changeColor(pix.color);
                        pixelGrid.makeOrColorGrid(pix.xCoordinate, pix.yCoordinate  - 39, pix.xCoordinate + 39, pix.yCoordinate, 1);
                    }
                }
                lines++;
            }
        }
    }

}
