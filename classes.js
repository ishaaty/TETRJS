let canvas = document.querySelector("canvas");

class Pixel {
    xCoordinate;
    yCoordinate;
    color;
    isAvailable;

    constructor (xCoordinate, yCoordinate, color){
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.color = color || "white";
        this.isAvailable = false;
    }

    changeAvailability() {
        this.isAvailable = !(this.isAvailable);
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
    }

    moveDown(){
        for (let i = 0; i < this.pixelList.length; i++) {
            let newY = this.pixelList[i].yCoordinate + 40;

            this.grid.changeColor("white");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate-1, this.pixelList[i].yCoordinate -1, this.pixelList[i].xCoordinate + 38, newY-1, 1);
            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate+1, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate + 38, this.pixelList[i].yCoordinate-1, 1);
            
            this.pixelList[i].yCoordinate = newY;
        }
    }

    moveRight(){
        // if (this.pixelList[0].xCoordinate >= canvas.width || this.pixelList[this.pixelList.length-1].yCoordinate <= 40) {
        //     return;
        // }

        for (let i = 0; i < this.pixelList.length; i++) {
            if (this.pixelList[i].xCoordinate + 40 >= canvas.width){
                return;
            }
        }

        for (let i = 0; i < this.pixelList.length; i++) {
            this.pixelList[i].xCoordinate += 40;
        } 
    }

    moveLeft(){
        // if (block.pixelList[0].xCoordinate >= canvas.width || block.pixelList[this.pixelList.length-1].yCoordinate <= 40) {
        //     return;
        // }
        for (let i = 0; i < this.pixelList.length; i++) {
            if (this.pixelList[i].xCoordinate - 40 < 0){
                return;
            }
        }

        for (let i = 0; i < this.pixelList.length; i++) {
            this.pixelList[i].xCoordinate -= 40;
        } 
    }
}

class Square extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid);
        this.pixelList.push(new Pixel(startX + 40, startY));
        this.pixelList.push(new Pixel(startX, startY - 40));
        this.pixelList.push(new Pixel(startX + 40, startY - 40));
    }
}

class LBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid);
        this.pixelList.push(new Pixel(startX, startY - 40));
        this.pixelList.push(new Pixel(startX, startY - 80));
        this.pixelList.push(new Pixel(startX + 40, startY - 80));
    }
}

class JBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid);
        this.pixelList.push(new Pixel(startX, startY - 40));
        this.pixelList.push(new Pixel(startX, startY - 80));
        this.pixelList.push(new Pixel(startX - 40, startY - 80));
    }
}

class TBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid);
        this.pixelList.push(new Pixel(startX, startY - 40));
        this.pixelList.push(new Pixel(startX - 40, startY));
        this.pixelList.push(new Pixel(startX + 40, startY));
    }
}

class SBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid);
        this.pixelList.push(new Pixel(startX - 40, startY));
        this.pixelList.push(new Pixel(startX, startY - 40));
        this.pixelList.push(new Pixel(startX + 40, startY - 40));
    }
}

class ZBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid);
        this.pixelList.push(new Pixel(startX + 40, startY));
        this.pixelList.push(new Pixel(startX, startY - 40));
        this.pixelList.push(new Pixel(startX - 40, startY - 40));
    }
}

class Line extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid);
        this.pixelList.push(new Pixel(startX, startY - 40));
        this.pixelList.push(new Pixel(startX, startY - 80));
        this.pixelList.push(new Pixel(startX, startY - 120));
    }
}