export class Path {
    start: {x: number, y: number};
    end: {x: number, y: number};
    length: number;
    constructor([a, b], [c, d]) {
        this.start = {x: a, y: b};
        this.end = {x: c, y: d};
        this.length = Math.abs(this.start.x - this.end.x + this.start.y - this.end.y) + 1;
    }
}