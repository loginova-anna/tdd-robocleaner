export class Path {
  start: {x: number, y: number};
  end: {x: number, y: number};
  length: number;
  isHorizontal: boolean;
  onSameLine: Function;
  intersects: Function;
  extend: Function;
  constructor([a, b]: [number, number], [c, d]: [number, number]) {
    this.start = {x: a, y: b};
    this.end = {x: c, y: d};
    if ((a === c && b >= d) || (b === d && a >=c)) {
      this.start = {x: c, y: d};
      this.end = {x: a, y: b};
    }
    this.length = Math.abs(this.start.x - this.end.x + this.start.y - this.end.y) + 1;
    this.isHorizontal = this.start.y === this.end.y ? true : false;
    this.onSameLine = function(p: Path): boolean {
      if (this.isHorizontal && p.isHorizontal && this.start.y === p.start.y) {
          return true;
      }
      if (!this.isHorizontal && !p.isHorizontal && this.start.x === p.start.x) {
          return true;
      }
      return false;
    }
    this.intersects = function(p: Path): number {
      if (this.isHorizontal && p.isHorizontal) {
        if (!this.onSameLine(p)) { return 0; }
        let [left, right] = [this, p].sort((a, b) => a.start.x - b.start.x)
        if (left.end.x < right.start.x) {return 0;}
        return Math.min(left.end.x, right.end.x) - right.start.x + 1;
      }
      if (!this.isHorizontal && !p.isHorizontal) {
        if (!this.onSameLine(p)) { return 0; }
        let [top, bot] = [this, p].sort((a, b) => a.start.y - b.start.y)
        if (top.end.y < bot.start.y) {return 0;}
        return Math.min(top.end.y, bot.end.y) - bot.start.y + 1;
      }
      let hor = this.isHorizontal ? this : p;
      let ver = !this.isHorizontal ? this : p;
      if (
        hor.start.x <= ver.start.x &&
        hor.end.x >= ver.end.x &&
        hor.start.y >= ver.start.y &&
        hor.end.y <= ver.end.y
      ) {
        return 1;
      }
      return 0;
    }
    this.extend = function(p: Path): Path {
      if (!this.onSameLine(p)) {return p};
      if ((this.isHorizontal && p.isHorizontal && this.start.x <= p.start.x) || 
        (!this.isHorizontal && !p.isHorizontal && this.start.y <= p.start.y)) {
        return new Path([this.start.x, this.start.y], [p.end.x, p.end.y]);
      }
      return new Path([p.start.x, p.start.y], [this.end.x, this.end.y]);
    }
  }
}