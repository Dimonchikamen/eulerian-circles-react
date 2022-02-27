import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";

interface Point {
  x: number;
  y: number;
}
const EulerCircles = () => {
  const [count, setCount] = useState(4);

  const p1 = { x: 220, y: 220 };
  const p2 = { x: 440, y: 220 };
  const p3 = { x: 220, y: 440 };
  const p4 = { x: 440, y: 440 };

  function getDistance(point1: Point, point2: Point) {
    let dx = Math.abs(point1.x - point2.x);
    let dy = Math.abs(point1.y - point2.y);
    return Math.sqrt(dx * dx + dy * dy);
  }

  useEffect(() => {
    resize();
  }, []);

  function resize() {
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    // resize the canvas to fill browser window dynamically
    window.addEventListener("resize", resizeCanvas, false);

    function resizeCanvas() {
      //   canvas.width = window.innerWidth * 0.9;
      canvas.width = 650;
      canvas.height = window.innerHeight * 0.7;
      draw(ctx!);
    }

    resizeCanvas();
  }

  function draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < count; i++) {
      let x = 220;
      let y = 220;
      if (i % 2 !== 0) {
        x = 440;
      }
      if (i === 2 || i === 3) {
        y = 440;
      }
      ctx!.lineWidth = 5;

      ctx!.beginPath();
      ctx!.arc(x, y, 200, 0, Math.PI * 2, true);
      ctx!.closePath();
      ctx!.stroke();
    }
    for (let i = 0; i < 1800; i += 2)
      for (let j = 0; j < 900; j += 2) {
        let curPoint = { x: i, y: j };
        if (
          (getDistance(curPoint, p1) < 200 &&
            getDistance(curPoint, p2) < 200) ||
          getDistance(curPoint, p3) < 200 //&&
          // getDistance(curPoint, p4) < 200
        ) {
          ctx!.lineWidth = 5;
          ctx!.fillStyle = "blue";
          ctx!.fillRect(i, j, 1, 1);
        }
      }

    ctx!.stroke();
  }
  return (
    <div className={styles.container}>
      <canvas id="canvas"></canvas>
    </div>
  );
};

const styles = {
  container: css`
    display: grid;
    place-items: center;
  `,
};

export default EulerCircles;
