import { useEffect } from "react";
import { draw } from "Helpers/Drawer";
import { TruthTable } from "Types/TruthTable";
import styles from "./EulerCircles.module.css";

interface IEulerCircles {
  table: TruthTable;
  theme: string;
}

const EulerCircles = (props: IEulerCircles) => {
  const table = props.table;

  useEffect(() => {
    if (table.variables.length !== 0) {
      resize();
    }
  }, [table]);

  useEffect(() => {
    resize();
  }, [props.theme]);

  function resize() {
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    function resizeCanvas() {
      if (window.innerWidth >= 1300) {
        canvas.width = window.innerWidth * 0.4;
        canvas.height = window.innerHeight * 0.65;
      } else if (window.innerWidth >= 1000) {
        canvas.width = window.innerWidth * 0.4;
        canvas.height = window.innerHeight * 0.65;
      } else if (window.innerWidth >= 700) {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.65;
      } else if (window.innerWidth >= 400) {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.outerHeight * 0.5;
      } else {
        canvas.width = window.innerWidth * 0.82;
        canvas.height = window.outerHeight * 0.45;
      }
      draw(
        ctx,
        table,
        canvas.width,
        canvas.height,
        3,
        Math.min(canvas.width, canvas.height) / 4,
        props.theme
      );
    }
    resizeCanvas();
  }

  return (
    <div className={styles.container} id="capture_circles">
      <canvas id="canvas" className={styles.drawField} />
    </div>
  );
};

export default EulerCircles;
