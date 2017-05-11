//function to solve the RBMaze
function RBGenerate(x,y){
    //create random order to visit nodes
    var dir = [0,1,2,3];
    dir = shuffle(dir);
    var time=100;

    //for each direction
    for(var i=0;i<4;i++){
        var newX = x;
        var newY = y;
        if(dir[i] == 0){newY -= 1;}
        if(dir[i] == 1){newY += 1;}
        if(dir[i] == 2){newX -= 1;}
        if(dir[i] == 3){newX += 1;}

        //if not a dead end
        if((newX >= 0) && (newX < width) && (newY >= 0) && (newY < height) && (RBMaze[newX][newY].visited == 0)){
            //mark tile as visited
            RBMaze[newX][newY].visited = 1;
            RBMaze[x][y].visited = 1;

            //destroy walls
            switch(dir[i]){
              case 0:
                RBMaze[x][y].north = 0;
                RBMaze[newX][newY].south = 0;
                break;
              case 1:
                  RBMaze[x][y].south = 0;
                  RBMaze[newX][newY].north = 0;
                break;
              case 2:
                RBMaze[x][y].west = 0;
                RBMaze[newX][newY].east = 0;
                break;
              case 3:
                RBMaze[x][y].east = 0;
                RBMaze[newX][newY].west = 0;
                break;
            }

            //recursive loop
            RBGenerate(newX, newY);
        }
    }
}

//draw the RBMaze
function RBDraw(){
  //get the canvas context we will draw to
  var canvas = document.getElementById("RBCanvas");
  var ctx = canvas.getContext("2d");

  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw the new maze to the canvas
  for(var i=0;i<width;i++){
      for(var ii=0;ii<height;ii++){
          if(RBMaze[i][ii].north == 1){ctx.fillRect(i*size,ii*size,size,1);}
          if(RBMaze[i][ii].south == 1){ctx.fillRect(i*size,ii*size+size-1,size,1);}
          if(RBMaze[i][ii].east == 1){ctx.fillRect(i*size+size-1,ii*size,1,size);}
          if(RBMaze[i][ii].west == 1){ctx.fillRect(i*size,ii*size,1,size);}
      }
  }
}
