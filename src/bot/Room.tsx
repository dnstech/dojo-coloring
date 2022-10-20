/* eslint-disable react/style-prop-object */
import { Pattern, Point, Svg, SVG } from "@svgdotjs/svg.js";
import React, { ForwardedRef, useEffect, useRef } from "react";
import * as ReactDOMServer from "react-dom/server";
import { IRoom, IRoomProps } from "./types";

import './Room.scss';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

const BLOBS = [
  <g fill="#272727"> <path d="M0 .5A.5.5 0 0 1 .5 0h15a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H14v2h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H14v2h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5H2v-2H.5a.5.5 0 0 1-.5-.5v-3A.5.5 0 0 1 .5 6H2V4H.5a.5.5 0 0 1-.5-.5v-3zM3 4v2h4.5V4H3zm5.5 0v2H13V4H8.5zM3 10v2h4.5v-2H3zm5.5 0v2H13v-2H8.5zM1 1v2h3.5V1H1zm4.5 0v2h5V1h-5zm6 0v2H15V1h-3.5zM1 7v2h3.5V7H1zm4.5 0v2h5V7h-5zm6 0v2H15V7h-3.5zM1 13v2h3.5v-2H1zm4.5 0v2h5v-2h-5zm6 0v2H15v-2h-3.5z"></path> </g>,
  <g fill="#272727"> <path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/> <path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5z"/> </g>,
];

const BLOBSTATIC = BLOBS.map(b => ReactDOMServer.renderToStaticMarkup(b));

const COLORS = [
  '#ffbc42',
  '#d81159',
  '#8f2d56',
  '#218380',
  '#73d2de',
  '#c3d350',
  '#e6f14a',
  '#db7f67',
  '#00955E',
  '#48994F',
  '#baab68',
  '#e3c16f',
  '#f0d116',
  '#efaac4',
  '#ffc4d1',
  '#465e9a',
  '#5B1BDE',
  '#e546a9',
  '#41CCD8',
  '#A28223',
];

const Room = forwardRef((props: IRoomProps, ref: ForwardedRef<IRoom>) => {
  const width = props.width;
  const height = props.height;
  const gridSize = props.gridSize;
  const colCount = Math.floor(width / gridSize);
  const rowCount = Math.floor(height / gridSize);
  const iconPercentage = 0.7;
  const obstacleFillMax = 0.7;
  const obstacleFillMin = 0.3;

  const obstacles: { [id: string]: boolean } = {};

  const svgRef = useRef<SVGSVGElement>(null);
  const lastRecording: string[] = [];

  const reset = () => {
    if (!svgRef.current) {
      return;
    }

    const svg = SVG(svgRef.current)
    // clear the obstacles
    Object.keys(obstacles).forEach(key => delete obstacles[key]);
    // clear the recording
    lastRecording.splice(0, lastRecording.length);
    svg.clear();
    draw(svg)
  }

  const getBoundingBox = (): DOMRect => {
    if (!svgRef.current) {
      // not ready yet!
      return new DOMRect();
    }

    return svgRef.current.getBoundingClientRect();
  }

  const hasObstacle = (row: number, col: number) => {
    if (row < 0 || row >= rowCount || col < 0 || col >= colCount) {
      return true;
    }

    return !!obstacles[`${row}_${col}`];
  };

  const color = (row: number, col: number, fillColor: number = -1) => {
    //console.log('coloring request', row, col, fillColor);
    if (!svgRef.current) {
      // not ready yet!
      return false;
    }

    if (hasObstacle(row, col)) {
      // bound and obstacle check
      return false;
    }

    const svg = SVG(svgRef.current);
    const fillIndex = fillColor >= 0 ? (Math.floor(fillColor) % COLORS.length) : Math.floor(Math.random() * COLORS.length);
    //console.log('colored', row, col, COLORS[fillIndex]);
    // svg cordinate col == x, row == y
    svg
      .rect(gridSize, gridSize)
      .fill(COLORS[fillIndex])
      .move(col * gridSize, row * gridSize);

      return true;
  };

  const draw = (svg: Svg) => {
    initialDraw(svg);
    generateRandomObstacles(svg);
  };

  const initialDraw = (svg: Svg) => {
    //console.log('initial draw', svg);
    svg.viewbox(0, 0, width, height);
    const pattern = svg.pattern(gridSize * 2, gridSize * 2, (pat: Pattern) => {
      pat.rect(gridSize * 2, gridSize * 2).fill('#eee');
      pat.rect(gridSize, gridSize).fill('#ddd');
      pat.rect(gridSize, gridSize).move(gridSize, gridSize).fill('#ddd');
    });

    svg.rect(width, height).fill(pattern);
  }

  const generateRandomObstacles = (svg: Svg) => {
    const max = colCount * rowCount * obstacleFillMax;
    const min = colCount * rowCount * obstacleFillMin;
    const count = Math.floor(Math.random() * (max - min) + min);
    let i = 0;
    let tryCount = 0;
    while (i < count) {
      const randRow = Math.floor(Math.random() * rowCount);
      const randCol = Math.floor(Math.random() * colCount);
      const key = `${randRow}_${randCol}`;

      if (!obstacles[key]) {
        obstacles[key] = true;
        i++;
      }

      tryCount++;
      if (tryCount > 100 * count) {
        throw 'Not enough spaces for all the obstacles';
      }
    }

    drawObstacles(svg);
  }

  const drawObstacles = (svg: Svg) => {
    const iconSize = gridSize * iconPercentage;
    const deltaPos = gridSize * (0.5 - iconPercentage / 2);
    for (let key in obstacles) {
      const splits = key.split('_');
      const x = parseInt(splits[1]) * gridSize; // col
      const y = parseInt(splits[0]) * gridSize; // row
      const randI = Math.floor(Math.random() * BLOBSTATIC.length);
      svg.nested()
        .svg(BLOBSTATIC[randI])
        .size(iconSize, iconSize)
        .viewbox('0 0 16 16').move(x + deltaPos, y + deltaPos);
    }
  }

  useEffect(() => {
    if (svgRef.current) {
      reset();
    }
  });

  useImperativeHandle(ref, () =>({
    rowCount,
    colCount,
    getBoundingBox,
    reset,
    color
  }));

  return (
    <div className="room">
      <svg xmlns="http://www.w3.org/2000/svg" ref={svgRef} role="room">
      </svg>
    </div>
  );
});

export default Room;