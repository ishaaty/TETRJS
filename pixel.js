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
    color;

    constructor (xCoordinate, yCoordinate, color){
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.color = color || "white";
    }

    changeColor(color){
        this.color = color;
    }

    fill(x = 0, y  = 0){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(x, y, 1, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    makeOrColorGrid(xMin, yMin, xMax, yMax, inc) {
        // making vertical lines
        for (let xUpdate = xMin; xUpdate < xMax; xUpdate += inc){
            for (let yUpdate = yMin; yUpdate < yMax; yUpdate++){
                this.fill(xUpdate, yUpdate);
            }
        }

        // making horizontal lines
        for (let yUpdate = yMin; yUpdate < yMax; yUpdate += inc){ 
            for (let xUpdate = xMin; xUpdate < xMax; xUpdate++){
                this.fill(xUpdate, yUpdate);
            }
        }
    }   
}

class Block extends Pixel {

    grid;

    constructor (startX, startY, grid){
        super(startX, startY);
        this.grid = grid;
    }


    moveDown(){
        let newY = this.yCoordinate + 40;

        this.grid.changeColor("white");
        this.grid.makeOrColorGrid(this.xCoordinate-1, this.yCoordinate -1, this.xCoordinate + 38, newY-1, 1);
        this.grid.changeColor("rgb(3, 3, 151)");
        this.grid.makeOrColorGrid(this.xCoordinate+1, this.yCoordinate-38, this.xCoordinate + 38, this.yCoordinate-1, 1);
        
        this.yCoordinate = newY;

    }
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
    let i = 0;

    let block = new Block(160, 0, pixelGrid);
    let v;

    v = setInterval(function() {
        block.moveDown();
        if (block.yCoordinate == canvas.height){
            clearInterval(v);
        }
    }, 1000)
    i++;
      
});

function nothing(){
    console.log("tetrjs");
};


