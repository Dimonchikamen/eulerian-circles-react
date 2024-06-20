import { useEffect } from 'react';
import { draw } from 'Helpers/Drawer';
import { TruthTable } from 'Types/TruthTable';
import styles from './EulerCircles.module.css';

interface IEulerCircles {
    table: TruthTable;
    theme: string;
}

function resize(table: TruthTable, theme: string) {
    const canvas: HTMLCanvasElement = document.getElementById(
        'canvas'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    let fontSize;
    function resizeCanvas() {
        if (window.innerWidth >= 1300) {
            canvas.width = window.innerWidth * 0.4;
            canvas.height = window.innerHeight * 0.65;
            fontSize = 40;
        } else if (window.innerWidth >= 1000) {
            canvas.width = window.innerWidth * 0.4;
            canvas.height = window.innerHeight * 0.65;
            fontSize = 30;
        } else if (window.innerWidth >= 700) {
            canvas.width = window.innerWidth * 0.8;
            canvas.height = window.innerHeight * 0.65;
            fontSize = 25;
        } else if (window.innerWidth >= 400) {
            canvas.width = window.innerWidth * 0.8;
            canvas.height = window.outerHeight * 0.5;
            fontSize = 20;
        } else {
            canvas.width = window.innerWidth * 0.82;
            canvas.height = window.outerHeight * 0.45;
            fontSize = 15;
        }
        draw(
            ctx,
            table,
            canvas.width,
            canvas.height,
            theme,
            3,
            Math.min(canvas.width, canvas.height) / 4,
            fontSize
        );
    }
    resizeCanvas();
}

const EulerCircles = (props: IEulerCircles) => {
    const table = props.table;

    useEffect(() => {
        if (table.variables.length !== 0) {
            resize(table, props.theme);
        }
    }, [table, props.theme]);

    useEffect(() => {
        resize(table, props.theme);
    }, [table, props.theme]);

    return (
        <div className={styles.container} id="capture_circles">
            <canvas id="canvas" className={styles.drawField} />
        </div>
    );
};

export default EulerCircles;
