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

class Block {

    grid;
    pixelList;

    constructor (startX, startY, grid){
        this.grid = grid;
        this.pixelList = [];
        this.pixelList.push(new Pixel(startX, startY));
        this.pixelList.push(new Pixel(startX + 40, startY));
        this.pixelList.push(new Pixel(startX, startY - 40));
        this.pixelList.push(new Pixel(startX + 40, startY - 40));
    }


    moveDown(){
        for (let i = 0; i < this.pixelList.length; i++) {
            let newY = this.pixelList[i].yCoordinate + 40;

            this.grid.changeColor("white");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate-1, this.pixelList[i].yCoordinate -1, this.pixelList[i].xCoordinate + 38, newY-1, 1);
            this.grid.changeColor("rgb(3, 3, 151)");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate+1, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate + 38, this.pixelList[i].yCoordinate-1, 1);
            
            this.pixelList[i].yCoordinate = newY;

            if (newY == canvas.height){
                return -1;
            }

        }
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

    let v;

    let block = new Block(160, 40, pixelGrid);
    v = setInterval(function() {
        block.moveDown();

        if (block.yCoordinate + 40 == canvas.height){
            clearInterval(v);
        }
    }, 1000);
      
});

function nothing(){
    console.log("tetrjs");
};


