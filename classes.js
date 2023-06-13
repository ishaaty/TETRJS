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
        this.isAvailable = true;
    }

    changeAvailability() {
        this.isAvailable = false;
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
    color;

    constructor (startX, startY, grid, color){
        this.grid = grid;
        this.pixelList = [];
        this.color = color || "white";
        this.pixelList.push(new Pixel(startX, startY, color));
    }

    colorBlock() {
        for (let i = 0; i < this.pixelList.length; i++) {
            this.grid.changeColor(this.pixelList[i].color);
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate + 1, this.pixelList[i].yCoordinate-1, this.pixelList[i].xCoordinate + 39, this.pixelList.yCoordinate-38, 1);
        }
    }

    moveDown(){
        for (let i = 0; i < this.pixelList.length; i++) {
            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate+1, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate + 39, this.pixelList[i].yCoordinate-1, 1);
        }
        for (let i = 0; i < this.pixelList.length; i++) {
            let newY = this.pixelList[i].yCoordinate + 40;

            this.grid.changeColor(this.pixelList[i].color);
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate + 1, this.pixelList[i].yCoordinate, this.pixelList[i].xCoordinate + 39, newY, 1);
            this.grid.changeColor("white");
            this.grid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);

            this.pixelList[i].yCoordinate = newY;
        }
    }

    moveRight(){
        
        for (let i = 0; i < this.pixelList.length; i++) {
            if (this.pixelList[i].xCoordinate + 40 >= canvas.width || this.pixelList[i].yCoordinate >= canvas.height){
                return;
            }
            this.pixelList[i].xCoordinate += 40;
            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate-39, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate-1, this.pixelList[i].yCoordinate, 1);
        } 
    }

    moveLeft(){
        for (let i = 0; i < this.pixelList.length; i++) {
            if (this.pixelList[i].xCoordinate - 40 < 0 ||this.pixelList[i].yCoordinate >= canvas.height || gridList[block.pixelList[i].yCoordinate/40][block.pixelList[i].xCoordinate/40-1].isAvailable){
                return;
            }
            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(this.pixelList[i].xCoordinate+1, this.pixelList[i].yCoordinate-38, this.pixelList[i].xCoordinate+39, this.pixelList[i].yCoordinate, 1);
            this.pixelList[i].xCoordinate -= 40;
        }
    }

    slowDrop(){
        for (let i = 0; i < block.pixelList.length; i++) {
            let nextY = block.pixelList[i].yCoordinate + 40;
            if ((nextY == 800) || (gridList[nextY/40+1][block.pixelList[i].xCoordinate/40].isAvailable == false)) return;
        }
        this.moveDown();
        
    }

    quickDrop(){
        let dropping = true;
        let timesDrop = 0;

        let nextY, nextY1, nextY2, nextY3, nexts;
        nextY = block.pixelList[0].yCoordinate;
        nextY1 = block.pixelList[1].yCoordinate;
        nextY2 = block.pixelList[2].yCoordinate;
        nextY3 = block.pixelList[3].yCoordinate;

        nexts = [nextY,nextY1,nextY2,nextY3];

        while (dropping) {

            for (let i = 0; i < nexts.length; i++) {
                if ((nexts[i] == 800) || (gridList[nexts[i]/40+1][block.pixelList[i].xCoordinate/40].isAvailable == false)) {
                    dropping = false;
                }
            }

            timesDrop ++;

            for (let i = 0; i < nexts.length; i++) {
                nexts[i] += 40;
            }
        } 
        for (let i = 1; i < timesDrop-1; i++) {
            this.moveDown();
        }
    }

    rotate(){
        let centerX = this.pixelList[0].xCoordinate;
        let centerY = this.pixelList[0].yCoordinate;

        this.grid.changeColor("black");
        this.grid.makeOrColorGrid(
            this.pixelList[0].xCoordinate+1, 
            this.pixelList[0].yCoordinate-38, 
            this.pixelList[0].xCoordinate + 38, 
            this.pixelList[0].yCoordinate-1, 1);
        
        for (let i = 1; i < this.pixelList.length; i++) {
            let distToCenterX, distToCenterY;

            distToCenterX = this.pixelList[i].xCoordinate - centerX;
            distToCenterY = this.pixelList[i].yCoordinate - centerY;

            this.grid.changeColor("black");
            this.grid.makeOrColorGrid(
                this.pixelList[i].xCoordinate+1, 
                this.pixelList[i].yCoordinate-38, 
                this.pixelList[i].xCoordinate + 38, 
                this.pixelList[i].yCoordinate-1, 1);

            this.pixelList[i].xCoordinate = centerX + (distToCenterY);
            this.pixelList[i].yCoordinate = centerY + (distToCenterX * -1);
        }
    }
}

class Square extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#FEFB34");
        this.pixelList.push(new Pixel(startX + 40, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX + 40, startY - 40, this.color));
        
        this.colored = "#FEFB34";
    }
}

class LBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#FFC82E");
        this.pixelList.push(new Pixel(startX, startY + 40, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX + 40, startY - 40, this.color));

        this.colored = "#FFC82E";
    }
}

class JBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#0341AE");
        this.pixelList.push(new Pixel(startX, startY + 40, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX - 40, startY - 40, this.color));

        this.colored = "#0341AE";
    }
}

class TBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#DD0AB2");
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX - 40, startY, this.color));
        this.pixelList.push(new Pixel(startX + 40, startY, this.color));

        this.colored = "#DD0AB2";
    }
}

class SBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#53DA3F");
        this.pixelList.push(new Pixel(startX - 40, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX + 40, startY - 40, this.color));

        this.colored = "#53DA3F";
    }
}

class ZBlock extends Block {
    constructor (startX, startY, grid){
        super(startX, startY, grid, "#FD3F59");
        this.pixelList.push(new Pixel(startX + 40, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));
        this.pixelList.push(new Pixel(startX - 40, startY - 40, this.color));

        this.colored = "#FD3F59";
    }
}

class Line extends Block {
    constructor (startX, startY, grid){
        super(startX, startY + 40, grid, "#01EDFA");
        this.pixelList.push(new Pixel(startX, startY + 80, this.color));
        this.pixelList.push(new Pixel(startX, startY, this.color));
        this.pixelList.push(new Pixel(startX, startY - 40, this.color));

        this.colored = "#01EDFA";
    }
}

