class Board {

  constructor() {
    this.boardArray = this.createBoard()
  }

 createBoard() {
  const boardArray = []
  for(let y = 0; y < 3; y++) {
    const row = []
    for(let x = 0; x <3; x++) {
      row.push(null)
    }
    boardArray.push(row)
  }
  return(boardArray)
 }

 renderBoard() {
   console.log(`
        0 1 2
       -------
    0 |${this.printCoordinate(0, 0)} ${this.printCoordinate(1,0)} ${this.printCoordinate(2,0)}
    1 |${this.printCoordinate(0,1)} ${this.printCoordinate(1,1)} ${this.printCoordinate(2,1)}
    2 |${this.printCoordinate(0,2)} ${this.printCoordinate(1,2)} ${this.printCoordinate(2,2)}
   `)
 }

 printCoordinate(x, y) {
   if(this.boardArray[y][x] === null) {
     return ' '
   } else {
     return this.boardArray[y][x]
   }
 }
}

class Player {
  takeTurn(board, x, y, counter) {
    const newBoard = board;
    newBoard[y][x] = counter
    console.log(newBoard)
    return newBoard
  }
}


board = new Board;
player = new Player;
board.renderBoard()
player.takeTurn(board.boardArray, 0, 0, 'X')