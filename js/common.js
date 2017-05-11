//create some global parameters that each maze will use
var height = 15;
var width = 15;
var size = 15;
var seed = 0;

//create arrays for each maze that will be displayed on the screen
var RBMaze = new Array(width);for(var i=0;i< width;i++) {RBMaze[i]=new Array(height);}
var primsMaze = new Array(width);for(var i=0;i< width;i++) {primsMaze[i]=new Array(height);}

//create a random funciton that will work based on the seed value
Math.randomSeed = function(max, min) {
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;
    return min + rnd * (max - min);
}

//sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//stoled function to shuffle an array that will be used to determine direction
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = parseInt(Math.randomSeed(0,ctr));
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

//create a funciton that will clear all of our maze values
function clearMazes(){
  for(var i=0;i<width;i++){
    for(var ii=0;ii<height;ii++){
      //recursive backtrack
      RBMaze[i][ii] = new Object();
      RBMaze[i][ii].north = 1;
      RBMaze[i][ii].south = 1;
      RBMaze[i][ii].east = 1;
      RBMaze[i][ii].west = 1;
      RBMaze[i][ii].visited = 0;

      //prims
      primsMaze[i][ii] = new Object();
      primsMaze[i][ii].north = 1;
      primsMaze[i][ii].south = 1;
      primsMaze[i][ii].east = 1;
      primsMaze[i][ii].west = 1;
      primsMaze[i][ii].visited = 0;
      primsMaze[i][ii].mark = 0;
    }
  }
}

//function to create the mazes
function createMazes(){
  //set the seed and let the user know what the seed is
  seed = Math.floor(Math.random() * (89898989898989898989 - 29898989898989898989 + 1)) + 29898989898989898989;
  document.getElementById("mazeSeed").innerHTML = "Seed used for mazes generated: " + seed;

  //clear all the mazes
  clearMazes();

  //create and draw the recusive backtrack maze
  RBGenerate(0,0);
  RBDraw();
  primsGenerate(0,0);
  primsDraw();
}

//generate initial mazes once the document has loaded
document.addEventListener('DOMContentLoaded', function(){
    createMazes();
}, false);
