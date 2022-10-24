import { IRoom } from "./bot/types";

export const mouseClickHandler = (room: IRoom, e: MouseEvent) => {
  let bb = room.getBoundingBox();
  let room_x = Math.floor(((e.x - bb.x) / bb.width) * room.colCount);
  let room_y = Math.floor(((e.y - bb.y) / bb.height) * room.rowCount);
  room.color(room_y, room_x);
};

export const fillTheRoom = (room: IRoom) => {
  let color = Math.random() * 10000;
  let cell_delay = 1.00; // Increase to slow the fill, or decrease to speed it up.

  let start_time = new Date().getTime();
  for (let y = 0; y < room.rowCount; ++y) {
    for (let x = 0; x < room.colCount; ++x) {
      let cb = function() {
        let current_time = new Date().getTime(),
        delta = current_time - start_time;

        let delay = y*room.colCount*cell_delay + x*cell_delay;
        if (delta >= delay) {
          room.color(y, x, color);
        } else {
          requestAnimationFrame(cb);
        }
      }
      requestAnimationFrame(cb);
    }
  }
};
