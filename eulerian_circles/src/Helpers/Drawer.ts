import { Point } from "../Types/Point";

export class Drawer {

    static draw(ctx: CanvasRenderingContext2D, points: Point[], lineWidth = 1, radius = 200) {

        points.forEach(point => {
            this.drawCircle(ctx, lineWidth, point, radius);
        });

        for (let i = 0; i < 1800; i += 2) {
            for (let j = 0; j < 900; j += 2) {
                let curPoint: Point = { x: i, y: j };
                if (this.getDistance(curPoint, points[0]) <= radius - lineWidth &&
                    this.getDistance(curPoint, points[1]) <= radius - lineWidth ||
                    this.getDistance(curPoint, points[2]) <= radius - lineWidth) {
                    ctx.lineWidth = lineWidth;
                    ctx.fillStyle = "blue";
                    ctx.fillRect(i, j, 1, 1);
                }
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

}