import { useEffect } from "react";
import { Drawer } from "../../Helpers/Drawer";
import { TruthTable } from "../../Types/TruthTable";
import styles from "./EulerCircles.module.css";

interface IEulerCircles {
  table: TruthTable;
}

const EulerCircles = (props: IEulerCircles) => {
  const table = props.table;
  //const [count, setCount] = useState(4);

  useEffect(() => {
    if (table.variables.length !== 0) {
      resize();
    }
  }, [table]);

  function resize() {
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    // resize the canvas to fill browser window dynamically
    // window.addEventListener("resize", resizeCanvas, false);

    function resizeCanvas() {
      //   canvas.width = window.innerWidth * 0.9;
      if (window.innerWidth >= 1300) {
        canvas.width = window.innerWidth * 0.4;
        canvas.height = window.innerHeight * 0.65;
        Drawer.draw(ctx!, table, canvas.width, canvas.height, 3);
      } else if (window.innerWidth >= 1000) {
        canvas.width = window.innerWidth * 0.4;
        canvas.height = window.innerHeight * 0.65;
        Drawer.draw(ctx!, table, canvas.width, canvas.height, 3, 120);
      } else if (window.innerWidth >= 700) {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.65;
        Drawer.draw(ctx!, table, canvas.width, canvas.height, 3, 140);
      } else if (window.innerWidth >= 400) {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.5;
        Drawer.draw(ctx!, table, canvas.width, canvas.height, 3, 100);
      } else {
        canvas.width = window.innerWidth * 0.82;
        canvas.height = window.innerHeight * 0.4;
        Drawer.draw(ctx!, table, canvas.width, canvas.height, 3, 80);
      }
      //   Drawer.draw(ctx!, table, canvas.width, canvas.height, 3);
    }
    resizeCanvas();
  }

  return (
    <div className={styles.container}>
      <canvas id="canvas" className={styles.drawField} />
    </div>
  );
};

export default EulerCircles;
