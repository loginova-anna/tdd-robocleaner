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

test('PathsIntersect', () => {
    expect(pathsIntersect(new Path([0, 0], [10, 0]), new Path([0, 0], [0, 10]))).toBe(1);
    expect(pathsIntersect(new Path([0, 0], [10, 0]), new Path([0, 1], [0, 10]))).toBe(0);
    expect(pathsIntersect(new Path([3, 3], [10, 3]), new Path([5, 0], [5, 5]))).toBe(1);
    expect(pathsIntersect(new Path([3, 3], [10, 3]), new Path([2, 3], [9, 3]))).toBe(7);
    expect(pathsIntersect(new Path([3, 3], [10, 3]), new Path([2, 3], [12, 3]))).toBe(8);
    expect(pathsIntersect(new Path([3, 3], [3, 10]), new Path([3, 2], [3, 12]))).toBe(8);
    expect(pathsIntersect(new Path([3, 3], [3, 10]), new Path([3, 2], [3, 9]))).toBe(7);
})