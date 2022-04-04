import { useEffect } from "react";
import { css } from "@emotion/css";
import { Drawer } from "../../Helpers/Drawer";
import { Point } from "../../Types/Point";
import { TruthTable } from "../../Types/TruthTable";

interface IEulerCircles {
  table: TruthTable;
}

const EulerCircles = (props: IEulerCircles) => {
  const table = props.table;
  //const [count, setCount] = useState(4);

  const p1: Point = { x: 220, y: 220 };
  const p2: Point = { x: 440, y: 220 };
  const p3: Point = { x: 220, y: 440 };
  const p4: Point = { x: 440, y: 440 };

  const points = [p1, p2, p3, p4];

  useEffect(() => {
    if (table.variables.length !== 0) {
      resize();
    }
  }, [table.variables.length]);

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
      Drawer.draw(ctx!, points, 3);
    }
    resizeCanvas();
  }

  return (
    <div className={styles.container}>
      <canvas id="canvas" />
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
