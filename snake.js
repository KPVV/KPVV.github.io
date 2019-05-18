//
//
// //Setting up my snake variable
// var drawSnake =function(snakeToDraw) {
// var drawableSnake = { color: "yellow", pixels: snake };
// var drawableObjects = [drawableSnake];
// CHUNK.draw(drawableObjects);
// }
//
// var moveSegment = function(segment) {
//   switch(segment.direction) {
//     case "down":
//       return { top: segment.top + 1, left: segment.left };
//     case "up":
//       return { top: segment.top - 1, left: segment.left };
//     case "right":
//       return { top: segment.top, left: segment.left + 1 }
//     case "left":
//       return { top: segment.top, left: segment.left - 1 }
//     default:
//       return segment;
//   }
// }
//
// //Move snake
// var moveSnake = function(snake) {
//   var oldSegment = snake[0];
//   var newSegment = { top: oldSegment.top + 1, left: oldSegment.left };
//   newSegment.direction = oldSegment.direction;
//   var newSnake = [newSegment];
//   return newSnake;
// }
// //Move
// var advanceGame = function() {
//   snake = moveSnake(snake);
//   drawSnake(snake);
// }
//
// var changeDirection = function(direction) {
//   snake[0].direction = direction;
// }
//
// //Setting up my snake variable
// var snake = [{ top: 0, left: 0, direction: "down" }];
// CHUNK.executeNTimesPerSecond(advanceGame, 1);
// CHUNK.onArrowKey(changeDirection);




//Setting up snake
var draw = function(snakeToDraw,apple) {
  var drawableSnake = { color: "green", pixels: snakeToDraw };
  var drawableApple = { color: "red", pixels: [apple] };
  var drawableObjects = [drawableSnake, drawableApple];
  CHUNK.draw(drawableObjects);
}

//Var Movement
var moveSegment = function(segment) {
  switch(segment.direction) {
    case "down":
      return { top: segment.top + 1, left: segment.left };
    case "up":
      return { top: segment.top - 1, left: segment.left };
    case "right":
      return { top: segment.top, left: segment.left + 1 }
    case "left":
      return { top: segment.top, left: segment.left - 1 }
    default:
      return segment;
  }
}

var segmentFurtherForwardThan = function(index, snake) {
  return snake[index - 1] || snake[index];
}
var moveSnake = function(snake) {
  return snake.map(function(oldSegment, segmentIndex) {
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
    return newSegment;

  });
}
var growSnake = function(snake) {
  var tipOfTailIndex = snake.length - 1;
  var tipOfTail = snake[tipOfTailIndex];
  snake.push({ top: tipOfTail.top, left: tipOfTail.left });
  return snake;
}
var ate = function(snake, otherThing) {
  var head = snake[0];
  return CHUNK.detectCollisionBetween([head], otherThing);
}

var advanceGame = function() {
  var newSnake = moveSnake(snake);

  if (ate(newSnake, snake)) {
    CHUNK.endGame();
    CHUNK.flashMessage("GAME OVER!");
  }
  if (ate(newSnake, [apple])) {
    newSnake = growSnake(newSnake);
    apple = CHUNK.randomLocation();
  }
  if (ate(newSnake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();
    CHUNK.flashMessage("GAME OVER!");
  }

  snake = newSnake;
  draw(snake, apple);
}

var changeDirection = function(direction) {
  snake[0].direction = direction;
}

var apple = CHUNK.randomLocation();
var snake = [{ top: 1, left: 0, direction: "down" }, { top: 0, left: 0, direction: "down" }];

CHUNK.executeNTimesPerSecond(advanceGame, 1);
CHUNK.onArrowKey(changeDirection);
