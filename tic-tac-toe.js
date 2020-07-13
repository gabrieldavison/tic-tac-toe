//Readline required to get input from command line
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Board {
  createBoard() {
    const boardArray = [];
    for (let y = 0; y < 3; y++) {
      const row = [];
      for (let x = 0; x < 3; x++) {
        row.push(null);
      }
      boardArray.push(row);
    }
    return boardArray;
  }

  renderBoard(board) {
    console.log(`
        0 1 2
       -------
    0 | ${this.printCoordinate(board, 0, 0)} ${this.printCoordinate(
      board,
      1,
      0
    )} ${this.printCoordinate(board, 2, 0)}
    1 | ${this.printCoordinate(board, 0, 1)} ${this.printCoordinate(
      board,
      1,
      1
    )} ${this.printCoordinate(board, 2, 1)}
    2 | ${this.printCoordinate(board, 0, 2)} ${this.printCoordinate(
      board,
      1,
      2
    )} ${this.printCoordinate(board, 2, 2)}
   `);
  }

  //Prints coordinate or empty space if coordinate is null
  printCoordinate(board, x, y) {
    if (board[y][x] === null) {
      return " ";
    } else {
      return board[y][x];
    }
  }
}

class Player {
  constructor(name, counter) {
    this.name = name;
    this.counter = counter;
  }
  takeTurn(board, coordinates, counter) {
    const newBoard = board;
    newBoard[coordinates[1]][coordinates[0]] = counter;
    return newBoard;
  }
}

class Game {
  //Prompts player for coordinates in command line
  getMove(boardState, callback) {
    let xcoord;
    let ycoord;
    rl.question(`Enter X coordinate: `, (answer) => {
      xcoord = answer;
      rl.question("Enter Y coordinate: ", (answer) => {
        ycoord = answer;
        callback(boardState, [xcoord, ycoord]);
      });
    });
  }
  //Check if mood is legal
  checkValid(board, coordinates) {
    if (
      coordinates[0] < 0 ||
      coordinates[0] > 2 ||
      coordinates[1] < 0 ||
      coordinates[1] > 2
    ) {
      return false;
    } else if (board[coordinates[1]][coordinates[0]] !== null) {
      return false;
    } else {
      return true;
    }
  }
  //Checks to see if game has been won. Returns null if no winner.
  checkWinner(board) {
    let winner = false;

    const winningLines = [
      // Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      //Columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      //Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[2][0], board[1][1], board[0][2]],
    ];
    winningLines.forEach((line) => {
      if (line.toString() === "X,X,X" || line.toString() === "O,O,O") {
        winner = true;
      }
    });
    return winner;
  }

  // Checks if game is a draw
  checkDraw(board) {
    if (!board.flat().flat().includes(null)) {
      return true;
    } else {
      return false;
    }
  }
}

function startGame() {
  board = new Board();
  player1 = new Player("Player 1", "X");
  player2 = new Player("Player 2", "O");
  game = new Game();
  // let boardState = board.createBoard();
  let currentPlayer = player1;
  board.renderBoard(board.createBoard());

  function getInput(boardState = board.createBoard()) {
    console.log(`${currentPlayer.name}'s turn.`);
    game.getMove(boardState, checkCoordinates);
  }

  function checkCoordinates(boardState, coordinates) {
    if (game.checkValid(boardState, coordinates) === false) {
      console.log("Invalid move, please enter a valid set of coordinates");
      return game.getMove(boardState, checkCoordinates);
    } else {
      updateBoardState(boardState, coordinates);
    }
  }

  function updateBoardState(boardState, coordinates) {
    const newState = currentPlayer.takeTurn(
      boardState,
      coordinates,
      currentPlayer.counter
    );
    board.renderBoard(newState);
    checkWinner(newState);
  }

  function checkWinner(boardState) {
    if (game.checkWinner(boardState)) {
      console.log(`${currentPlayer.name} is the winner!`);
    } else if (game.checkDraw(boardState)) {
      console.log("The game is a draw.");
    } else {
      //Switch current player
      currentPlayer === player1
        ? (currentPlayer = player2)
        : (currentPlayer = player1);
      getInput(boardState);
    }
  }

  getInput();
}

const winBoard = [
  [["O"], [null], [null]],
  [[null], ["O"], [null]],
  [[null], [null], ["O"]],
];
const drawBoard = [
  [["O"], ["X"], ["O"]],
  [["X"], ["O"], ["X"]],
  [["X"], ["O"], ["X"]],
];

startGame();
