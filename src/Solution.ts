import { IRoom } from "./bot/types";

export const mouseClickHandler = (room: IRoom, e: MouseEvent) => {
  let bb = room.getBoundingBox();
  let room_x = Math.floor(((e.x - bb.x) / bb.width) * room.colCount);
  let room_y = Math.floor(((e.y - bb.y) / bb.height) * room.rowCount);
  room.color(room_y, room_x);
};

export const fillTheRoom = (room: IRoom) => {
  // your code here for challenge 2
};