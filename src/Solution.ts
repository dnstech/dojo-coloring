import { IRoom } from "./bot/types";

export const mouseClickHandler = (room: IRoom, e: MouseEvent) => {
  // your code here for challenge 1
  const roomBoundingBox = room.getBoundingBox();
  const gridSize = roomBoundingBox.width / room.colCount;
  const row = Math.floor((e.clientY - roomBoundingBox.y) / gridSize);
  const col = Math.floor(e.clientX / gridSize);
  room.color(row, col);
};

export const fillTheRoom = (room: IRoom) => {
  // your code here for challenge 2
  const deltaCol = [1, 0, -1,  0];
  const deltaRow = [0, 1,  0, -1];

  const createUnvisitedArray = (rowCount: number, colCount: number): boolean[][] => {
    const array = [];
    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < colCount; j++) {
        row.push(false);
      }

      array.push(row);
    }

    return array;
  };

  const visited = createUnvisitedArray(room.rowCount, room.colCount);

  const bfs = (row: number, col: number, callBack: (lastRow: number, lastCol: number) => void) => {
    const rowQueue: number[] = [];
    const colQueue: number[] = [];
    const fillColor = Math.floor(Math.random() * 1000);

   // console.log('start exploring', row, col);

    rowQueue.push(row);
    colQueue.push(col);
    visited[row][col] = true;
    room.color(row, col, fillColor);

    const doExplore = () => {
      const curRow = rowQueue.shift() as number;
      const curCol = colQueue.shift() as number;
      for (let k = 0; k < 4; k++) {
        const nextRow = curRow + deltaRow[k];
        const nextCol = curCol + deltaCol[k];
        if (nextRow < 0 || nextRow >= room.rowCount || nextCol < 0 || nextCol >= room.colCount) {
          continue;
        }

        if (!visited[nextRow][nextCol] && room.color(nextRow, nextCol, fillColor)) {
          visited[nextRow][nextCol] = true;
          rowQueue.push(nextRow);
          colQueue.push(nextCol);
        }
      }

      if (colQueue.length > 0) {
        setTimeout(doExplore, 0);
      } else {
        //console.log('done!!');
        callBack(row, col);
      }
    };

    doExplore();
  };

  // let the fill happen
  const callBack = (row: number, col: number) => {
    col++;
    if (col === room.colCount) {
      row++;
      col = 0;
    }
    if (row === room.rowCount) {
      return;
    }

    if (!visited[row][col]) {
      bfs(row, col, callBack);
    } else if (row < room.rowCount) {
      callBack(row, col);
    }
  };

  bfs(0, 0, callBack);
};