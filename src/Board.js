import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3 , chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({length: nrows}, () => Array.from({length: ncols}));

    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        initialBoard[i][j] = Math.random() > .5
      }
    }

    return initialBoard;
  }


  function hasWon() {
    for (let row of board) {
      if (row.filter(x => !x).length !== ncols) {
        return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copy = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it
      for (let row in copy) { 
        for (let col in row) { 
          if ((row > x-1 && row < x+1) && (col > y-1 && col < y+1)) {
            flipCell(row, col, copy)
          }
        }
      }

      // TODO: return the copy
      return copy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon())  {
    return <div>YOU WON!</div>
  } else {
    return (
      <div>
        {board.map(y => <tr>{y.map(x => 
        <Cell 
          isLit={x}
          flipCellsAroundMe={flipCellsAround}/>)}</tr>)}
      </div>
    )
  }

  // make table board

  // TODO

}

export default Board;
