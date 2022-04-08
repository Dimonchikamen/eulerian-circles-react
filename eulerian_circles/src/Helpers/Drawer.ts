import { Point } from "../Types/Point";
import { TruthTable } from "../Types/TruthTable";

export class Drawer {

    static draw(ctx: CanvasRenderingContext2D, table: TruthTable, width: number, height: number, lineWidth = 1, radius = 200) {
        const variables = table.variables;
        const body = table.body;
        const circles = this.getCircles(variables, width, height, radius);
        circles.forEach(circle => {
            this.drawCircle(ctx, lineWidth, circle.center, radius);
        });

        for (let i = 0; i < width; i += 2) {
            for (let j = 0; j < height; j += 2) {
                let curPoint: Point = { x: i, y: j };
                body.forEach(row => {
                    const expressionIsTrue = row[row.length - 1];
                    if (expressionIsTrue) {
                        let subResult = true;
                        for (let k = 0; k < row.length - 1; k++) {
                            const circle = circles[k];
                            subResult = subResult && this.getDistance(circle.center, curPoint) < radius === Boolean(row[k]);
                        }
                        if (subResult) {
                            ctx.lineWidth = lineWidth;
                            ctx.fillStyle = "blue";
                            ctx.fillRect(i, j, 1, 1);
                        }
                    }
                });
            }
        }

        ctx.stroke();
    }

    private static drawCircle(ctx: CanvasRenderingContext2D, lineWidth: number, center: Point, radius: number) {
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    }

    private static getDistance(point1: Point, point2: Point) {
        let dx = Math.abs(point1.x - point2.x);
        let dy = Math.abs(point1.y - point2.y);
        return Math.sqrt(dx * dx + dy * dy);
    }

    private static getCircles(variables: string[], width: number, height: number, circleRadius: number) {
        const result = [];
        const centres = this.getCentres(variables.length, width, height, circleRadius);
        for (let i = 0; i < centres.length; i++) {
            result.push({ name: variables[i], center: centres[i] })
        }
        return result
    }

    private static getCentres(pointsCount: number, width: number, height: number, circleRadius: number) {
        const result: Point[] = [];
        const center: Point = { x: width / 2, y: height / 2 };
        if (pointsCount === 1) {
            result.push({ x: center.x, y: center.y });
        } else if (pointsCount === 2) {
            result.push(...[
                { x: center.x - circleRadius / 2, y: center.y },
                { x: center.x + circleRadius / 2, y: center.y }
            ]);
        } else if (pointsCount === 3) {
            result.push(...[
                { x: center.x - circleRadius / 2, y: center.y - circleRadius / 2 },
                { x: center.x + circleRadius / 2, y: center.y - circleRadius / 2 },
                { x: center.x, y: center.y + circleRadius / 2 }
            ]);
        } else if (pointsCount === 4) {
            result.push(...[
                { x: center.x - circleRadius / 2, y: center.y - circleRadius / 2 },
                { x: center.x + circleRadius / 2, y: center.y - circleRadius / 2 },
                { x: center.x - circleRadius / 2, y: center.y + circleRadius / 2 },
                { x: center.x + circleRadius / 2, y: center.y + circleRadius / 2 },
            ]);
        }
        return result;
    }
}