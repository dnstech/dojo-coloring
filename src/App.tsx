import React, { useEffect, useRef } from "react";
import "./App.scss";
import Room from "./bot/Room";
import { IRoom } from './bot/types';
import { fillTheRoom, mouseClickHandler } from "./Solution";

function App() {

  const roomRef = useRef<IRoom>(null);

  useEffect(() => {
    window.addEventListener('mouseup', mouseUpHandler);
    return () => {
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  });

  const mouseUpHandler = (e: MouseEvent) => {
    if (!roomRef.current) {
      return;
    }

    mouseClickHandler(roomRef.current, e);
  };

  const reset = () => {
    roomRef.current?.reset();
  };

  const autoFillTheBoard = () => {
    if (!roomRef.current) {
      return;
    }

    fillTheRoom(roomRef.current);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fill the board!</h1>
        <div className="button-wrapper">
          <button className="reset" onClick={reset}>Reset</button>
          <button className="action-button" onClick={autoFillTheBoard}>Fill the board!</button>
        </div>
      </header>
      <Room width={1024} height={768} gridSize={16} ref={roomRef}/>
    </div>
  );
}

export default App;