export interface IRoom {
  rowCount: number;
  colCount: number;

  getBoundingBox(): DOMRect;
  color(row: number, col: number, fillColor: number = -1): boolean;
  reset();
}

export interface IRoomProps {
  width: number;
  height: number;
  gridSize: number;
}