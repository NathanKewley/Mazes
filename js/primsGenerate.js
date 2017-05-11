//function to solve the primsMaze
function primsGenerate(x,y){
  //set current node to visited and no longer marked
  primsMaze[x][y].visited = 1;
  primsMaze[x][y].mark = 0;
  var l=0,r=0,u=0,d=0;

  //mark all adjasent nodes that have not been visited
  if(x > 0){if(primsMaze[x-1][y].visited == 0){primsMaze[x-1][y].mark = 1;}else{l=1;}}
  if(x < width-1){if(primsMaze[x+1][y].visited == 0){primsMaze[x+1][y].mark = 1;}else{r=1;}}
  if(y > 0){if(primsMaze[x][y-1].visited == 0){primsMaze[x][y-1].mark = 1;}else{u=1;}}
  if(y < height-1){if(primsMaze[x][y+1].visited == 0){primsMaze[x][y+1].mark = 1;}else{d=1;}}

  //expand the maze in a random direciton that is avaliable
  var dirOrder = [0,1,2,3];
  dirOrder = shuffle(dirOrder);
  var expanded = 0;

  for(var i=0; i<4; i++){
    if((l==1) && (expanded == 0) && (dirOrder[i] == 0)){
      primsMaze[x][y].west = 0;
      primsMaze[x-1][y].east = 0;
      expanded = 1;
    }
    if((r==1) && (expanded == 0) && (dirOrder[i] == 1)){
      primsMaze[x][y].east = 0;
      primsMaze[x+1][y].west = 0;
      expanded = 1;
    }
    if((u==1) && (expanded == 0) && (dirOrder[i] == 2)){
      primsMaze[x][y].north = 0;
      primsMaze[x][y-1].south = 0;
      expanded = 1;
    }
    if((d==1) && (expanded == 0) && (dirOrder[i] == 3)){
      primsMaze[x][y].south = 0;
      primsMaze[x][y+1].north = 0;
      expanded = 1;
    }
  }

  //pick a random marked node [how to do this well?]
  //temp array to hold all the marked nodes
  var nodes = new Array();

  //find all marked nodes
  for(var i=0;i<width;i++){
      for(var ii=0;ii<height;ii++){
        if(primsMaze[i][ii].mark == 1){
          nodes.push({x:i,y:ii});
        }
      }
  }

  //if there are still marked nodes select one at random
  if(nodes.length > 0){
    //select random marked node and re-run with selected node
    var node = parseInt(Math.randomSeed(0,nodes.length));
    var node = nodes[node];
    primsGenerate(node.x,node.y);
  }

  //if none avaliabe this function is complete
}

//draw the primsMaze
function primsDraw(){
  //get the canvas context we will draw to
  var canvas = document.getElementById("primsCanvas");
  var ctx = canvas.getContext("2d");

  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw the new maze to the canvas
  for(var i=0;i<width;i++){
      for(var ii=0;ii<height;ii++){
          if(primsMaze[i][ii].north == 1){ctx.fillRect(i*size,ii*size,size,1);}
          if(primsMaze[i][ii].south == 1){ctx.fillRect(i*size,ii*size+size-1,size,1);}
          if(primsMaze[i][ii].east == 1){ctx.fillRect(i*size+size-1,ii*size,1,size);}
          if(primsMaze[i][ii].west == 1){ctx.fillRect(i*size,ii*size,1,size);}
      }
  }
}
