board = require("./tic-tac-toe");

const testBoard = new board();

const testState = [
  [[null], [null], [null]],
  [[null], [null], [null]],
  [[null], [null], [null]],
];
function testRow(index) {
  const row = testState;
  for (let i = 0; i < 3; i++) {
    row[index][i] = "X";
  }
  console.log(row);
}
