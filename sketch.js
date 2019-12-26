var GRID_SIZE = 20;

HEIGHT = 700;
WIDTH = 700;

squareSide = HEIGHT/GRID_SIZE;

var grid = [...Array(GRID_SIZE)].map(e => Array(GRID_SIZE));

let startCellX = 0;
let startCellY = 0;

let goalCellX = 0;
let goalCellY = 0;



function setup() {
  createCanvas(HEIGHT, WIDTH);
    background(200);
    resetGrid();
    //create sliders
    gridSizeSlider = createSlider(10, 100, 20, 10);
    gridSizeSlider.position(20, 20);
}

function draw() {
    //Check if slider value for gridsize has changed
    if(gridSizeSlider.value() != GRID_SIZE){
        //Reset all grid and stop processing path
        GRID_SIZE = gridSizeSlider.value();
        resetGrid();
    }
    drawGrid();
    if (mouseIsPressed) {//draw walls while pressing mouse
        var xSelected = Math.floor(mouseX/squareSide);
        var ySelected = Math.floor(mouseY/squareSide);    
        if(mouseX >= 0 && mouseX < HEIGHT && mouseY >= 0 && mouseY < HEIGHT){
            //avoid putting walls in start or end cell 
            if(grid[xSelected][ySelected] != 's' && grid[xSelected][ySelected] != 'e'){
                grid[xSelected][ySelected] = 'w';//put wall
            }
        }
    }

}

function drawGrid(){
    for(var i = 0; i < GRID_SIZE; i++){
        for(var j = 0; j < GRID_SIZE; j++){
            // Draw a rectangle at location (30, 20) with a width and height of 55.
            let color = [0,0,0];
            var currentCell = grid[i][j];
            switch(currentCell) {
              case 'a'://available cell
                color = [220,220,220];
                break;
              case 's'://start cell
                color = [0,255,255];
                break;
              case 'e'://end cell
                color = [0,200,0];
                break;
              case 'w'://wall cell
                color = [40,40,40];
                break;
              default:
                // code block
            }
            fill(color); // Use color variable 'c' as fill color
            var x = squareSide * i;
            var y = squareSide * j;
            rect(x, y, squareSide, squareSide); // Draw left rectangle
        }
    }
}
function resetGrid(){
    grid = [...Array(GRID_SIZE)].map(e => Array(GRID_SIZE));
    rows = GRID_SIZE;
    cols = GRID_SIZE;
    squareSide = 700/GRID_SIZE;
    //Put all grid values to available
    for(var i = 0; i < GRID_SIZE; i++){
        for(var j = 0; j < GRID_SIZE; j++){
            grid[i][j] = 'a'; 
        }
    }
    //choose a random starting cell
    startCellX = Math.floor(Math.random() * GRID_SIZE/2);
    startCellY = Math.floor(Math.random() * GRID_SIZE/2);
    //choose a random target cell
    goalCellX = Math.floor(Math.random() * GRID_SIZE/2)+(GRID_SIZE/2);
    goalCellY = Math.floor(Math.random() * GRID_SIZE/2)+(GRID_SIZE/2);
    
    //Assign values to the start and end cells
    grid[startCellX][startCellY] = 's';
    grid[goalCellX][goalCellY] = 'e';
}

function mouseClicked() {

  
  // prevent default
  return false;
}