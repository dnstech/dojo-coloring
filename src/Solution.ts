import { removeEmitHelper } from "typescript";
import { IRoom } from "./bot/types";

export const mouseClickHandler = (room: IRoom, e: MouseEvent) => {
  let rec = room.getBoundingBox();
  let rowHeight = rec.height / room.rowCount;
  let colWidth = rec.width / room.colCount;
  let currentRow = Math.floor(e.offsetY / rowHeight);
  let currentCol = Math.floor(e.offsetX / colWidth);
  room.color(currentRow, currentCol);
};

export const fillTheRoom = (room: IRoom) => {
  let positionColour:  number[][] = new Array(room.rowCount).fill(0).map(() => new Array(room.colCount).fill(0));
  let row = 0;
  let col = 0;
  let colour = Math.random() * 1000;
  for (; row < room.rowCount; row ++) {
    for (; col < room.colCount; col ++) {
      fillNeighbourPositions(room, positionColour, row, col);
    }
  }
};

const fillNeighbourPositions = (room: IRoom, positionColour:  number[][], row: number, col: number) => {
  let colour = positionColour[row][col];
  if (colour == 0) {
    colour = Math.random() * 1000;
    if (!room.color(row, col, colour)) {
      positionColour[row][col] = -1;
      colour = -1;
    }
  }
  if (colour > 0) {
    let tempCol = col + 1;
    for (; tempCol < room.colCount; tempCol ++) {
      if (positionColour[row][tempCol] !== 0) {
        break;
      }
      if (room.color(row, tempCol, colour)) {
        positionColour[row][tempCol] = colour;
      } else {
        break;
      }
    }
    tempCol = col - 1;
    for (; tempCol >= 0; tempCol --) {
      if (positionColour[row][tempCol] !== 0) {
        break;
      }
      if (room.color(row, tempCol, colour)) {
        positionColour[row][tempCol] = colour;
      } else {
        break;
      }
    }
    let tempRow = row + 1;
    for (; tempRow < room.rowCount; tempRow ++) {
      if (positionColour[tempRow][col] !== 0) {
        break;
      }
      if (room.color(tempRow, col, colour)) {
        positionColour[tempRow][col] = colour;
        fillNeighbourPositions(room, positionColour, tempRow, col);
      } else {
        break;
      }
    }
  }
}


