/// <reference types='jest' />
import {roboCleaner, pathsIntersect} from './roboCleaner';
import { Path } from './path.class';

test('RoboCleaner no crosses', () =>{
    expect(roboCleaner(2, [10, 10], ['N 2', 'E 1'])).toBe(4);
    expect(roboCleaner(3, [10, 10], ['N 2', 'E 2', 'S 2'])).toBe(7);
});

test('RoboCleaner crosses', () =>{
    expect(roboCleaner(4, [10, 10], ['N 2', 'E 2', 'S 2', 'W 2'])).toBe(8);
    expect(roboCleaner(4, [10, 10], ['N 3', 'E 2', 'S 2', 'W 3'])).toBe(10);
});

test('RoboCleaner overlays', () =>{
    expect(roboCleaner(5, [10, 10], ['N 2', 'E 2', 'S 2', 'W 2', 'N 2'])).toBe(8);
    expect(roboCleaner(2, [10, 10], ['N 5', 'S 3'])).toBe(6);
});


test("RoboCleaner complex", () =>{
    expect(roboCleaner(9, [10, 10], ['N 3', 'E 4', 'S 2', 'W 2', 'N 2', 'E 3', 'N 1', 'W 4', 'S 2'])).toBe(20);
    expect(roboCleaner(9, [100, 100], 'W5 N1 E6 S2 W2 N4 W2 S2 E6'.split(' ').map(el => el[0] + ' ' + el.substr(1)))).toBe(24)
    expect(roboCleaner(28, [100, 100], 'S4 E1 N2 W5 N1 E1 S2 W2 N1 W3 N1 E1 S2 W4 N3 E2 S4 W1 N2 W4 N1 E1 S3 W2 N4 W1 S2 E14'.split(' ').map(el => el[0] + ' ' + el.substr(1)))).toBe(54);
});

test('PathsIntersect', () => {
    expect(pathsIntersect(new Path([0, 0], [10, 0]), new Path([0, 0], [0, 10]))).toBe(1);
    expect(pathsIntersect(new Path([0, 0], [10, 0]), new Path([0, 1], [0, 10]))).toBe(0);
    expect(pathsIntersect(new Path([3, 3], [10, 3]), new Path([5, 0], [5, 5]))).toBe(1);
    expect(pathsIntersect(new Path([3, 3], [10, 3]), new Path([2, 3], [9, 3]))).toBe(7);
    expect(pathsIntersect(new Path([3, 3], [10, 3]), new Path([2, 3], [12, 3]))).toBe(8);
    expect(pathsIntersect(new Path([3, 3], [3, 10]), new Path([3, 2], [3, 12]))).toBe(8);
    expect(pathsIntersect(new Path([3, 3], [3, 10]), new Path([3, 2], [3, 9]))).toBe(7);
})