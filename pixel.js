let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let currentColor = document.querySelector("#currentColor");
let clearBtn = document.querySelector("#clear");
let color = "black";
let pixelsList = [];
let selectedArray = [];

class Pixel {
    xCoordinate;
    yCoordinate;

    constructor (xCoordinate, yCoordinate){
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    fill(x = 0, y  = 0, color="black"){
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, 1, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    makeOrColorGrid(xMin, yMin, xMax, yMax, inc, color) {
        // making vertical lines
        for (let xUpdate = xMin; xUpdate < xMax; xUpdate += inc){
            for (let yUpdate = yMin; yUpdate < yMax; yUpdate++){
                this.fill(xUpdate, yUpdate, color);
            }
        }

        // making horizontal lines
        for (let yUpdate = yMin; yUpdate < yMax; yUpdate += inc){ 
            for (let xUpdate = xMin; xUpdate < xMax; xUpdate++){
                this.fill(xUpdate, yUpdate, color);
            }
        }
    }   
}

class Block extends Pixel {
    color = "black";
    startX = 160;
    startY = 0;

    // moveDown(grid){
    //     newX = startX + 40;
    //     newY = startY + 40;

    //     grid.makeOrColorGrid(startX, startY, startX+40, startY+40, 1, "white");
    //     grid.makeOrColorGrid(newX, newY, newX+40, newY+40, 1, "black");



    // }
}


for(let x = 0; x <= canvas.height; x += 40){
    for (let y = 0; y <= canvas.width; y += 40){
        let pixel = new Pixel(x, y);
        pixelsList.push(pixel);
    }
}


window.addEventListener("load", function () {
    // creating the grid
    let pixelGrid = pixelsList[0]; // contains coordinates (0,0)
    pixelGrid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);

    // let block = new Block();
    // pixelGrid.makeOrColorGrid(block.startX, block.startY, block.startX+40, block.startY+40, 1);

    // block.moveDown(pixelGrid);
});


