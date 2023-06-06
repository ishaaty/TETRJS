let ctx = canvas.getContext("2d");
let currentColor = document.querySelector("#currentColor");
let clearBtn = document.querySelector("#clear");
let color = "black";
let gridList = [];

for(let x = 0; x <= canvas.height; x += 40){
    for (let y = 0; y <= canvas.width; y += 40){
        let pixel = new Pixel(x, y);
        gridList.push(pixel);
    }
}

// movement based on input
window.addEventListener("keydown", function (e) {
    if (e.repeat) {
        return;
    }
    if (e.key == "ArrowLeft") {
        block.moveLeft();
    }
    if (e.key == "ArrowRight") {
        block.moveRight();
    }
    if (e.key == "ArrowDown") {
        block.slowDrop();
    }
    if (e.key == " ") {
        block.quickDrop();
    }
});

// doing this as a temp fix, need a better way of handling what blocks are active
let block;
window.addEventListener("load", function () {
    // creating the grid
    let pixelGrid = gridList[0]; // contains coordinates (0,0)
    pixelGrid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);

    createBlock(pixelGrid);
    
      
});


function createBlock(pixelGrid) {
    let v;
    let rand = Math.floor(Math.random() * 7);
    switch(rand) {
        case 0:
            block = new Square(160, 40, pixelGrid);
            break;
        case 1:
            block = new LBlock(160, 40, pixelGrid);
            break;
        case 2:
            block = new JBlock(160, 40, pixelGrid);
            break;
        case 3:
            block = new TBlock(160, 40, pixelGrid);
            break;
        case 4:
            block = new ZBlock(160, 40, pixelGrid);
            break;
        case 5:
            block = new SBlock(160, 40, pixelGrid);
            break;
        case 6:
            block = new Line(160, 40, pixelGrid);
    }
    v = setInterval(function() {
        block.moveDown();
        // if (block.pixelList[block.pixelList.length -1].yCoordinate + 40 == canvas.height){
        for (let i = 0; i < block.pixelList.length; i++){
            // also add if block underneath is not available (use isAvailable and changeAvailability)
            if (block.pixelList[i].yCoordinate >= canvas.height){
                clearInterval(v);
                for (let i = 0; i < block.pixelList.length; i++){
                    console.log(block.pixelList[i].isAvailable);
                    block.pixelList[i].changeAvailability();
                    console.log(block.pixelList[i].isAvailable);
                }
            }
        }
            
    }, 1000);
}

