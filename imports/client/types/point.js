export const Point = class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    to(point) {
        if (point.x === undefined || point.y === undefined) {
            return undefined;
        }
        const diffX = Math.abs(this.x - point.x);
        const diffY = Math.abs(this.y - point.y);
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        return distance;
    }
};