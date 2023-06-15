let ctx = canvas.getContext("2d");
let currentColor = document.querySelector("#currentColor");
let clearBtn = document.querySelector("#clear");
let pointTag = document.querySelector("#points")
let paletteIn = sessionStorage.getItem("first");
let palette;
let color = "black";

let gridList = [];
let tempList = [];

let restart = false;
let block;
let score = 0;

// order: square, Lblock, Jblock, Tblock, Sblock, Zblock, line
if (paletteIn == "pastel") {
    palette = ["#faf873", "#ffda70", "#92b9fc", "#ffa6ed", "#95ff85", "#ff8293", "#8cfaff"];
} else if (paletteIn == "pink") {
    palette = ["#ffecee", "#ffe0e6", "#ffd4de", "#ffc9d6", "#febdce", "#feb1c6", "#fea5be"];
} else if (paletteIn == "blue") {
    palette = ["#dbedff", "#b6daff", "#a4d1ff", "#91c7ff", "#7fbeff", "#6cb4ff", "#47a0ff"];
} else if (paletteIn == "gray") {
    palette = ["#ffffff", "#d5d5d5", "#aaaaaa", "#808080", "#555555", "#2b2b2b", "#000000"];
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

// movement based on input
window.addEventListener("keydown", function (e) {
    if (e.repeat) {
        return;
    }
    if (e.key == "ArrowDown" || e.key == "s") {
        block.slowDrop();
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        for (let i = 0; i < block.pixelList.length; i++){
            if (block.pixelList[i].yCoordinate == 800 || gridList[block.pixelList[i].yCoordinate/40][block.pixelList[i].xCoordinate/40-1].isAvailable == false){
                return;
            }
        }
        block.moveLeft();
    }
    if (e.key == "ArrowRight" || e.key == "d") {
        for (let i = 0; i < block.pixelList.length; i++){
            if (block.pixelList[i].yCoordinate == 800 || gridList[block.pixelList[i].yCoordinate/40][block.pixelList[i].xCoordinate/40+1].isAvailable == false){
                return;
            }
        }
        block.moveRight();
    }
    if (e.key == "ArrowUp" || e.key == "w") {
        block.rotate();
    }
    if (e.key == " ") {
        block.quickDrop();
    }
});

window.addEventListener("load", function () {
    console.log(palette)
    // creating the grid
    let pixelGrid = gridList[0][0]; // contains coordinates (0,0)
    pixelGrid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);
    createBlock(pixelGrid);
    // create next block
    v = setInterval(function () {
        if (restart) {
            console.log(block.pixelList[block.pixelList.length - 1])
            if (block.pixelList[0].yCoordinate - block.height <= 0) {
                ctx.font = "50px Arial";
                ctx.fillText("GAME OVER", 45, 300);
                clearInterval();
            }
            else {
                score += 40;
                pointTag.innerHTML = "Score: " + score;
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
    console.log(palette[0]);
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
                for (let j = 0; j < block.pixelList.length; j++){
                    gridList[block.pixelList[j].yCoordinate/40][block.pixelList[j].xCoordinate/40].changeAvailability();
                }
                restart = true;
                clearInterval(v);
                break;
            }
        }
    }, 250);

}
