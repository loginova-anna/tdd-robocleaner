import { Path } from "./path.class";

export function roboCleaner(n: number, coords: [number, number], steps: string[]) {
    let currentPosition = coords,
        paths: Path[] = [],
        cleanedArea = 1,
        stepVectors = steps.map(el => getStepVector(el))
    for (let i = 0; i < n; i++){
        let newPosition = vectorSum(currentPosition, stepVectors[i]),
            newPath = new Path(currentPosition, newPosition);
        paths.push(newPath);
        cleanedArea += newPath.length - 1;
        currentPosition = newPosition;
    }
    return  cleanedArea;
}

function getStepVector(step: string) {
    let s = step.split(' '),
        direction = s[0],
        amount = +s[1],
        stepVector = [
            (direction === 'W' && -amount) || (direction === 'E' && amount) || 0,
            (direction === 'N' && -amount) || (direction === 'S' && amount) || 0
        ]
    return stepVector;
}

function vectorSum(a: number[], b: number[]): [number, number] {
    return [a[0] + b[0], a[1] + b[1]];
}

export function pathsIntersect(pathA: Path, pathB: Path): number {
    return pathA.intersects(pathB);
}