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
        let color = this.color;
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
    color;

    constructor (startX, startY, grid, color){
        this.grid = grid;
        this.pixelList = [];
        this.color = color || "white";
        this.pixelList.push(new Pixel(startX, startY, color));
    }

    moveDown(){
        for (let i = 0; i < this.pixelList.length; i++) {
            let newY = this.pixelList[i].yCoordinate + 40;

            this.grid.changeColor(this.pixelList[i].color);
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate + 1, this.pixelList[i].yCoordinate, this.pixelList[i].xCoordinate + 39, newY, 1);
            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate+1, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate + 39, this.pixelList[i].yCoordinate-1, 1);
            this.grid.changeColor("white");
            this.grid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);

            this.pixelList[i].yCoordinate = newY;
        }
    }

    moveRight(){
        // if (this.pixelList[0].xCoordinate >= canvas.width || this.pixelList[this.pixelList.length-1].yCoordinate <= 40) {
        //     return;
        // }

        for (let i = 0; i < this.pixelList.length; i++) {
            if (this.pixelList[i].xCoordinate + 40 >= canvas.width || this.pixelList[i].yCoordinate >= canvas.height){
                return;
            }
        }

        for (let i = 0; i < this.pixelList.length; i++) {
            this.pixelList[i].xCoordinate += 40;
            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate-39, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate-1, this.pixelList[i].yCoordinate, 1);
            
        } 
    }

    moveLeft(){
        // if (block.pixelList[0].xCoordinate >= canvas.width || block.pixelList[this.pixelList.length-1].yCoordinate <= 40) {
        //     return;
        // }
        for (let i = 0; i < this.pixelList.length; i++) {
            if (this.pixelList[i].xCoordinate - 40 < 0 ||this.pixelList[i].yCoordinate >= canvas.height){
                return;
            }
        }

        for (let i = 0; i < this.pixelList.length; i++) {
            let newX = this.pixelList[i].xCoordinate - 40;
            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate+1, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate+39, this.pixelList[i].yCoordinate, 1);
            this.pixelList[i].xCoordinate = newX;
        } 
    }

    slowDrop(){
        if (block.pixelList[0].yCoordinate + 40 < canvas.height) {
            this.moveDown();
        } 
    }

    quickDrop(){
        // while (block.pixelList[0].yCoordinate + 40 < canvas.height) {
        //     this.moveDown();
        // }
        let distToBottom = canvas.height - this.pixelList[0].yCoordinate;
        
        for (let i = 0; i < this.pixelList.length; i++) {
            let newY = this.pixelList[i].yCoordinate + distToBottom - 40;

            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate+1, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate + 38, this.pixelList[i].yCoordinate-1, 1);
            
            this.pixelList[i].yCoordinate = newY;

            this.grid.changeColor("white");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate-1, this.pixelList[i].yCoordinate -1, this.pixelList[i].xCoordinate + 38, newY-1, 1);
        }
    }
}

class Square extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#FEFB34");
        this.pixelList.push(new Pixel(startX + 40, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX + 40, startY - 40, this.color));
    }
}

class LBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY + 40, grid, "#FFC82E");
        this.pixelList.push(new Pixel(startX, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX + 40, startY - 40, this.color));
    }
}

class JBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY + 40, grid, "#0341AE");
        this.pixelList.push(new Pixel(startX, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX - 40, startY - 40, this.color));
    }
}

class TBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#DD0AB2");
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX - 40, startY, this.color));
        this.pixelList.push(new Pixel(startX + 40, startY, this.color));
    }
}

class SBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#53DA3F");
        this.pixelList.push(new Pixel(startX - 40, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX + 40, startY - 40, this.color));
    }
}

class ZBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#FD3F59");
        this.pixelList.push(new Pixel(startX + 40, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX - 40, startY - 40, this.color));
    }
}

class Line extends Block {
    constructor (startX, startY, grid){
        super(startX, startY + 80, grid, "#01EDFA");
        this.pixelList.push(new Pixel(startX, startY + 40, this.color));
        this.pixelList.push(new Pixel(startX, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
    }
}