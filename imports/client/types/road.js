import { Point } from './point';

export const Road = class Road {
    constructor(start) {
        if (!(start instanceof Point)) {
            throw new SyntaxError('new Road requires a first argument that is an instance of Point')
        }

        this._isRotating = false;
        this._rotationBaseAngle;
        this._rotationStart;

        this.render = {};
        this.start = start;
        this.rotation = 0;
        this.updateEnd(start);
    }

    contains(point) {
        if (point.x === undefined || point.y === undefined) {
            return undefined
        }

        let intersections = 0;

        this.vertices.forEach((vertex, i) => {
            const vertexNext = this.vertices[(i + 1) % this.vertices.length];
            const vertexA = (vertex.y < vertexNext.y) ? vertex : vertexNext;
            const vertexB = (vertex.y < vertexNext.y) ? vertexNext : vertex;

            point.y += (point.y === vertexA.y || point.y === vertexB.y) ? 0.00001 : 0;

            if (point.y >= vertexA.y && point.y <= vertexB.y && point.x <= Math.max(vertexA.x, vertexB.x)) {
                if (point.x < Math.min(vertexA.x, vertexB.x)) {
                    intersections++;
                } else {
                    const slopeOfRay = (point.y - vertexA.y) / (point.x - vertexA.x);
                    const slopeOfEdge = (vertexB.y - vertexA.y) / (vertexB.x - vertexA.x);
                    if (slopeOfRay >= slopeOfEdge) {
                        intersections++;
                    }
                }
            }
        });

        const isPointInside = intersections % 2 === 1;

        return isPointInside;
    }

    findRenderDimensions() {
        const c = this.start.to(this.end);
        const d = this.end.x - this.start.x;
        const gamma = Math.acos(d / c);
        const orientation = Math.sign(this.end.y - this.start.y);
        const delta = gamma - this.rotation * orientation;
        const renderDimensions = {
            x: c * Math.cos(delta),
            y: c * Math.sin(delta) * orientation
        };

        return renderDimensions
    }

    findRenderStart() {
        const a = new Point(0, 0).to(this.start);
        const alpha = Math.PI / 2 - this.rotation / 2;
        const b = 2 * a * Math.cos(alpha);
        const beta = Math.PI - alpha - Math.acos(this.start.x / a);
        const renderStart = {
            x: this.start.x + b * Math.cos(beta),
            y: this.start.y - b * Math.sin(beta)
        };

        return renderStart
    }

    findVertices() {
        const a = this.end.x - this.start.x;
        const b = this.end.y - this.start.y;
        const c = this.start.to(this.end);
        const alpha = Math.acos(a / c);
        const beta = alpha - this.rotation;
        const d = c * Math.cos(beta);
        const x = d * Math.cos(this.rotation);
        const y = d * Math.sin(this.rotation);
        const vertices = [
            this.start, new Point(this.start.x + x, this.start.y + y),
            this.end, new Point(this.end.x - x, this.end.y - y)
        ];

        return vertices
    }

    startRotation() {
        this._rotationBaseAngle = this.rotation;
        this._rotationStart = this.end;
        this._isRotating = true;
    }

    stopRotation() {
        this._isRotating = false;
    }

    updateEnd(point) {
        if (!(point instanceof Point)) {
            throw new SyntaxError('new Road requires a first argument that is an instance of Point');
        }

        // Set the endpoint
        this.end = point;

        // Set the rotation, relative to the point where rotation started
        if (this._isRotating) {
            const startToRoadEnd = this._rotationStart.to(this.end);
            const roadStartToStart = this.start.to(this._rotationStart);
            const roadStartToRoadEnd = this.start.to(this.end);
            const deltaAngle =
                Math.acos(
                    (roadStartToRoadEnd * roadStartToRoadEnd +
                    roadStartToStart * roadStartToStart -
                    startToRoadEnd * startToRoadEnd) /
                    (2 * roadStartToRoadEnd * roadStartToStart)
                );
            const direction = Math.sign(
                (this._rotationStart.x - this.start.x) * (this.end.y - this.start.y) -
                (this._rotationStart.y - this.start.y) * (this.end.x - this.start.x)
            );
            this.rotation = _rotationBaseAngle + deltaAngle * direction;
        }

        // Recalculate the vertices
        this.vertices = this.findVertices();

        // Recalculate the rendering data
        this.render = {
            start: this.findRenderStart(),
            dimensions: this.findRenderDimensions()
        }
    }
};