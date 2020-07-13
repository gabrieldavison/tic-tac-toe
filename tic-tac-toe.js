class Board {


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

 renderBoard(board) {
   console.log(`
        0 1 2
       -------
    0 | ${this.printCoordinate(board, 0, 0)} ${this.printCoordinate(board, 1,0)} ${this.printCoordinate(board, 2,0)}
    1 | ${this.printCoordinate(board, 0,1)} ${this.printCoordinate(board, 1,1)} ${this.printCoordinate(board, 2,1)}
    2 | ${this.printCoordinate(board, 0,2)} ${this.printCoordinate(board, 1,2)} ${this.printCoordinate(board, 2,2)}
   `)
 }

 printCoordinate(board, x, y) {
   if(board[y][x] === null) {
     return ' '
   } else {
     return board[y][x]
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

class Game {

}


board = new Board;
gameboard = board.createBoard()
board.renderBoard(gameboard)
player = new Player;
board.renderBoard(player.takeTurn(gameboard, 0, 0, 'X'))