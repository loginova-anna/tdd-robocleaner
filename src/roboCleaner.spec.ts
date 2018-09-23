/// <reference types="jest" />
import {roboCleaner} from "./roboCleaner";

test("RoboCleaner no crosses", () =>{
    expect(roboCleaner(2, [10, 10], ['N 2', 'E 1'])).toBe(4);
    expect(roboCleaner(3, [10, 10], ['N 2', 'E 2', 'S 2'])).toBe(7);
});

test("RoboCleaner crosses", () =>{
    expect(roboCleaner(4, [10, 10], ['N 2', 'E 2', 'S 2', 'W 2'])).toBe(8);
    expect(roboCleaner(4, [10, 10], ['N 3', 'E 2', 'S 2', 'W 3'])).toBe(10);
});

test("RoboCleaner overlays", () =>{
    expect(roboCleaner(5, [10, 10], ['N 2', 'E 2', 'S 2', 'W 2', 'N 2'])).toBe(8);
    expect(roboCleaner(2, [10, 10], ['N 5', 'S 3'])).toBe(6);
});