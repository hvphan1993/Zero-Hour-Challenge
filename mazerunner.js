const directions = {
  UP: "up",
  LEFT: "left",
  RIGHT: "right",
  DOWN: "down",
};

const colValues = {
  WALL: "t",
  OPEN: "f",
  PATH: "fp",
  DEADEND: "fx",
};

// set up the start and exit
var startRow = 0;
var startCol = 0;
var exitRow = 3;
var exitCol = 0;

function solveMaze() {
  var grid = cGrid;
  var curRow = 0;
  var curCol = 0;
  var prevRow = 0;
  var prevCol = 0;
  var stepCount = 0;
  var exitReached = false;
  var noExit = false;
  var minDistance = -1;
  var nextDirection;
  var moveUp = {};
  var moveLeft = {};
  var moveRight = {};
  var moveDown = {};

  // Mark the start as part of the path
  grid[startRow][startCol] = colValues.PATH;
  var elementID = `${startRow}: ${startCol}`;
  document.getElementById(elementID).setAttribute("blockValue", "step");

  // solve the maze
  do {
    let nextStep = [];
    let prevRow = curRow;
    let prevCol = curCol;

    moveUp = move(curRow, curCol, grid, directions.UP);
    if (moveUp.canMove == true){
        nextStep.push(moveUp);
    }

    moveDown = move(curRow, curCol, grid, directions.DOWN);
    if (moveDown.canMove == true) {
        nextStep.push(moveDown);
    }

    moveLeft = move(curRow, curCol, grid, directions.LEFT);
    if (moveLeft.canMove == true) {
        nextStep.push(moveLeft);
    }

    moveRight = move(curRow, curCol, grid, directions.RIGHT);
    if (moveRight.canMove == true) {
        nextStep.push(moveRight);
    }

    // if we have nowhere to go exit
    if (nextStep.length == 0) {
        noExit = true;
        break;
    }

    // sort nextStep by min distance
    nextStep.sort((a, b) => (a.minDistance = b.minDistance));

    switch (nextStep[0].direction){
        case directions.UP:
            // move up and add to step count
            stepCount++;
            curRow = curRow + 1;
            break;
        
        case directions.DOWN:
            // move down and add to step count
            stepCount++;
            curRow = curRow - 1;
            break;
        
        case directions.LEFT:
            // move left and add to step count
            stepCount++;
            curCol = curCol - 1;
            break;

        case directions.RIGHT:
            // move right and add to step count
            stepCount++;
            curCol = curCol + 1;
            break;
    }

    // mark the squares on the page
    exitReached = markElements(curRow, curCol, prevRow, prevCol, grid);

  } 
  while (exitReached == false || nopExit == true);
  if (exitReached == true) {
    document.getElementById(
      "results"
    ).innerHTML = `Success! It took ${stepCount} step(s)`;
  } else {
    document.getElementById("results").innerHTML = `Cannot find an exit!`;
  }
}

// see if we can move to the next square and calculate distance to the exit
function move(curRow, curCol, grid, direction) {
  var targetRow = curRow;
  var targetCol = curCol;
  var targetVal = "";
  var canMove = false;
  var minDistance = -1;

  switch (direction) {
    case directions.UP:
      targetRow = curRow + 1;
      break;
    case directions.LEFT:
      targetCol = curCol - 1;
      break;
    case directions.RIGHT:
      targetCol = curCol + 1;
      break;
    case directions.DOWN:
      targetRow = curRow - 1;
      break;
  }

  // check for out of bounds
  if (
    targetRow > grid.length - 1 ||
    targetRow < 0 ||
    targetCol > grid[targetRow].length ||
    targetCol < 0
  ) {
    return {
      canMove: false,
      minDistance: -1,
      direction: direction,
      colValue: colValues.WALL,
    };
  }

  // get value of the square we are trying to go to
  targetVal = grid[targetRow][targetCol];

  if (targetRow == startRow && targetCol == startCol) {
    // we cannot move back to start
    return {
      canMove: false,
      minDistance: -1,
      direction: direction,
      colValue: colValues.WALL,
    };
  } else if (targetVal == colValues.WALL || targetVal == colValues.DEADEND) {
    return {
      canMove: false,
      minDistance: -1,
      direction: direction,
      colValue: targetVal,
    };
  } else if (targetVal == colValues.PATH) {
    // if you have to go backwards to a previous marked square
    // we need to mark the current square as a deadend ('fx')
    // 'fp' means square has already been marked
    return {
      canMove: true,
      minDistance: GetMinDistance(targetRow, targetCol),
      direction: direction,
      colValue: targetVal,
    };
  }
  return {
    canMove: false,
    minDistance: -1,
    direction: direction,
    colValue: colValues.WALL,
  };
}
// gets the minDistance between target and exit
function GetMinDistance(targetRow, targetCol) {
    return Math.abs(exitRow - targetRow) + Math.abs((exitCol - targetCol));
}

// check if the target has been visited before. Mark it as a deadend.
// mark the grid
function markElements(targetRow, targetCol, prevRow, prevCol, grid) {
    var elementID = "";
    if (grid[targetRow][targetCol] == colValues.PATH){
        grid[prevRow][prevCol] = colValues.DEADEND;
        elementID = `${prevRow}:${prevCol}`
        document.getElementById(elementID).setAttribute("blockValue", "deadend");
    }

    elementID = `${targetRow}:${targetCol}`;
    document.getElementById(elementID).setAttribute("blockValue", "step");
    grid[targetRow][targetCol] = colValues.PATH;

    // test for an exit
    if (targetRow == exitRow && targetCol == exitCol) {
        return true;
    }
    else {
        return false;
    }
}