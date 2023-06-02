let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


class Pixel {
    constructor(xCoordinate, yCoordinate, color) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.color = color || "black";
    }
    changeColor(color) {
        this.color = color;
    }
    fill(x = 0, y = 0, color) {
        ctx.beginPath();
        ctx.fillStyle = color || this.color;
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    makeOrColorGrid(xMin, yMin, xMax, yMax, inc, color) {
        // making vertical lines
        for (let xUpdate = xMin; xUpdate < xMax; xUpdate += inc) {
            for (let yUpdate = yMin; yUpdate < yMax; yUpdate++) {
                if (!color) {
                    this.fill(xUpdate, yUpdate);
                }
                else {
                    this.fill(xUpdate, yUpdate, color);
                }
            }
        }
        // making horizontal lines
        for (let yUpdate = yMin; yUpdate < yMax; yUpdate += inc) {
            for (let xUpdate = xMin; xUpdate < xMax; xUpdate++) {
                if (!color) {
                    this.fill(xUpdate, yUpdate);
                }
                else {
                    this.fill(xUpdate, yUpdate, color);
                }
            }
        }
    }
}

let freeplayArray = [];

for(let x = 0; x <= 800; x += 40){
    for (let y = 0; y <= 800; y += 40){
        let p = new Pixel(x, y, "black");
        freeplayArray.push(p);
    }
}


let color = "black";
let pixelsList = [];
let selectedArray = [];


// filling pixelsList for freeplay screen
for (let x = 0; x <= canvas.height; x += 40) {
    for (let y = 0; y <= canvas.width; y += 40) {
        let pixel = new Pixel(x, y, color);
        pixelsList.push(pixel);
    }
}
window.addEventListener("load", function () {
    // creating the grid
    let pixelGrid = pixelsList[0]; // contains coordinates (0,0)
    pixelGrid.changeColor("black");
    pixelGrid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);
    }
});





