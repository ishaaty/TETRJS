let ctx = canvas.getContext("2d");
let currentColor = document.querySelector("#currentColor");
let clearBtn = document.querySelector("#clear");
let color = "black";
let gridList = [];
let tempList = [];

for (let y = 0; y <= canvas.height; y += 40) {
    for (let x = 0; x <= canvas.width; x += 40) {
        let pixel = new Pixel(x, y);
        tempList.push(pixel);
    }
    gridList.push(tempList);
    tempList = [];
}
console.log(gridList);

// movement based on input
window.addEventListener("keydown", function (e) {
    if (e.key == "ArrowDown") {
        block.slowDrop();
    }
    if (e.repeat) {
        return;
    }
    if (e.key == "ArrowLeft") {
        block.moveLeft();
    }
    if (e.key == "ArrowRight") {
        block.moveRight();
    }
    if (e.key == " ") {
        block.quickDrop();
    }
});

// doing this as a temp fix, need a better way of handling what blocks are active
window.addEventListener("load", function () {
    // creating the grid
    let pixelGrid = gridList[0][0]; // contains coordinates (0,0)
    pixelGrid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);
    let block = new Square(160, 40, pixelGrid);
    let v;
    v = setInterval(function () {

        block.moveDown();
        
        for (let i = 0; i < block.pixelList.length; i++){
            console.log(gridList.length);
            console.log(block.pixelList[i].yCoordinate);
            if (block.pixelList[i].yCoordinate == 800 || gridList[block.pixelList[i].yCoordinate/40+1][block.pixelList[i].xCoordinate/40].isAvailable == false){
                for (let j = 0; j < block.pixelList.length; j++){
                    gridList[block.pixelList[j].yCoordinate/40][block.pixelList[j].xCoordinate/40].changeAvailability();
                }
                clearInterval(v);
                break;
            }
        }


    }, 1000);
});


// function createBlock(pixelGrid) {
//     let v;
//     let rand = Math.floor(Math.random() * 7);
//     switch (rand) {
//         case 0:
//             block = new Square(160, 40, pixelGrid);
//             break;
//         case 1:
//             block = new LBlock(160, 40, pixelGrid);
//             break;
//         case 2:
//             block = new JBlock(160, 40, pixelGrid);
//             break;
//         case 3:
//             block = new TBlock(160, 40, pixelGrid);
//             break;
//         case 4:
//             block = new ZBlock(160, 40, pixelGrid);
//             break;
//         case 5:
//             block = new SBlock(160, 40, pixelGrid);
//             break;
//         case 6:
//             block = new Line(160, 40, pixelGrid);
//     }
//     block = new Square(160, 40, pixelGrid);

//     v = setInterval(function () {
//         block.moveDown();
        
//         for (let i = 0; i < block.pixelList.length; i++){

//             console.log(gridList);
//             if (gridList[block.pixelGrid[i].yCoordinate/40+1][block.pixelList[i].xCoordinate/40].isAvailable == false){
//                 for (let j = 0; j < block.pixelList.length; j++){
//                     gridList[block.pixelGrid[j].yCoordinate/40][block.pixelGrid[j].xCoordinate/40].changeAvailability();
//                 }
//                 console.log(block.pixelList);
//                 clearInterval(v);
//                 break;
//             }
//         }


//     }, 1000);

// }
