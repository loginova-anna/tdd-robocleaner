const fs = require('fs');

import { Path } from "./path.class";

launch();

function launch() {
    let fileNames = getFileNames();
    fileNames.forEach(fName => {
        readFileContents(fName).then(inputData => {
            let result = roboCleaner(inputData[0], inputData[1], inputData[2]);
            console.log('=> Cleaned:', result);
        });
    })
}

function getFileNames() {
    return process.argv.filter(el => el.indexOf('txt') > -1);
}

function readFileContents(filename: string): Promise<any> {
    return new Promise((res, rej) => {
        fs.readFile(filename, 'utf8', function(err: Error, data: string) {  
            if (err) rej(err);
            let dataArr = data.split('\n');
            let n = +dataArr[0];
            let coords = dataArr[1].split(' ').map(el => +el);
            let steps = dataArr.slice(2, dataArr.length);
            res([n, coords, steps]);
        });
    }) 
}

export function roboCleaner(n: number, coords: [number, number], steps: string[]): number {
  let currentPosition = coords,
      paths: Path[] = [],
      cleanedArea = 0,
      stepVectors = steps.map(el => getStepVector(el)),
      newPosition: [number, number],
      newPath: Path,
      newCleaned: number;
  for (let i = 0; i < n; i++){
    newPosition = vectorSum(currentPosition, stepVectors[i]);
    newPath = new Path(currentPosition, newPosition);
    [newCleaned, paths] = merge(newPath, paths);
    cleanedArea += newCleaned;
    currentPosition = newPosition;
  }
  return  cleanedArea;
}

function merge(newPath: Path, paths: Path[]): [number, Path[]] {
  let mergedPath = newPath,
      onLine: Path[] = [],
      perpendicular: Path[] = [],
      addedLength = newPath.length;
  paths.forEach(p => {
      let intL = newPath.intersects(p);
      if (intL > 1 || (intL === 1 && newPath.onSameLine(p))) {
          onLine.push(p);
          addedLength = addedLength - intL;
          mergedPath = mergedPath.extend(p);
      } else if(intL === 1) {
          perpendicular.push(p);
      }
  });
  addedLength = addedLength - perpendicular.filter(el => {
      for (let i = 0; i < onLine.length; i++) {
          if (el.intersects(onLine[i])) {
              return false;
          }
      }
      return true;
  }).length;

  function getMergedPaths(ps: Path[], ol: Path[], mp: Path): Path[] {
      let newPs: Path[] = [];
      ps.forEach(p => {
          if (ol.indexOf(p) === -1) {
              newPs.push(p);
          }
      });
      newPs.push(mp);
      return newPs;
  }
  return [addedLength, getMergedPaths(paths, onLine, mergedPath)];
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