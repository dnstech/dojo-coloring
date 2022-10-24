import { IRoom } from "./bot/types";

let colors: number[][] = [];
export const mouseClickHandler = (room: IRoom, e: MouseEvent) => {
  // your code here for challenge 1
  let pw = window.innerWidth / 1024;
  let col = Math.round(e.clientX / pw / 16);
  let row = Math.round((e.clientY - room.getBoundingBox().top) / pw / 16);
  if (row > 0 && col > 0) {
    window.requestAnimationFrame(() => {
      setColor(room, row, col);
    });
  }
};

export const fillTheRoom = (room: IRoom) => {
  // your code here for challenge 2
  for(let x = 0; x < 100; x++) {
    for(let y = 0; y < 100; y++) {
      window.requestAnimationFrame(() => {
        setColor(room, y, x);
      });
    }
  }
};

function setColor(room: IRoom, y: number, x: number) {
  let c = getColor(y, x) ||
    getColor(y + 1, x + 1) ||
    getColor(y + 1, x) ||
    getColor(y, x + 1) ||
    getColor(y - 1, x - 1) ||
    getColor(y - 1, x + 1) ||
    getColor(y + 1, x - 1) ||
    getColor(y - 1, x) ||
    getColor(y, x - 1) ||
    Math.round(Math.random() * 10) + 1;

  if (room.color(y, x, c)) {
    if (!colors[y]) {
      colors[y] = [];
    }

    colors[y][x] = c;
    return c;
  }
}

function getColor(y: number, x: number): number | null {
  if (colors[y] && colors[y][x]) {
    return colors[y][x];
  }

  return null;
}