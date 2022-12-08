import { readFileSync } from 'fs';

// const input = readFileSync('./example.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');

const treeGrid = input.split(/\n/).map((row) => row.split('').map(Number));

//* PART ONE
const perimeterTreeCount = treeGrid.length * 4 - 4;

const isTreeVisible = (row: number, position: number) => {
  const treeToCheck = treeGrid[row][position];
  const verticalRow = treeGrid.map((row) => row[position]);

  const left = treeGrid[row].slice(0, position);
  const right = treeGrid[row].slice(position + 1);
  const top = verticalRow.slice(0, row);
  const bottom = verticalRow.slice(row + 1);

  const checkTree = (tree: number) => tree < treeToCheck;

  return (
    left.every(checkTree) ||
    right.every(checkTree) ||
    top.every(checkTree) ||
    bottom.every(checkTree)
  );
};

let numVisibleTrees = 0;

treeGrid.forEach((row, rowNum, rowArr) =>
  row.forEach((pos, posNum, posArr) => {
    if (
      rowNum > 0 &&
      rowNum < rowArr.length - 1 &&
      posNum > 0 &&
      posNum < posArr.length - 1
    ) {
      if (isTreeVisible(rowNum, posNum)) {
        numVisibleTrees++;
      }
    }
  })
);

console.log(numVisibleTrees + perimeterTreeCount);
// 1798

//* PART TWO
const getNumVisibleTrees = (trees: number[], treeToCheck: number) => {
  let count = 0;
  for (const tree of trees) {
    if (tree >= treeToCheck) {
      count++;
      break;
    } else {
      count++;
    }
  }
  return count;
};

const getVisibilityScore = (row: number, position: number) => {
  const treeToCheck = treeGrid[row][position];
  const verticalRow = treeGrid.map((row) => row[position]);

  const left = treeGrid[row].slice(0, position).reverse();
  const right = treeGrid[row].slice(position + 1);
  const top = verticalRow.slice(0, row).reverse();
  const bottom = verticalRow.slice(row + 1);

  const leftCount = getNumVisibleTrees(left, treeToCheck);
  const rightCount = getNumVisibleTrees(right, treeToCheck);
  const topCount = getNumVisibleTrees(top, treeToCheck);
  const bottomCount = getNumVisibleTrees(bottom, treeToCheck);

  return leftCount * rightCount * topCount * bottomCount;
};

const visibilityScores: number[] = [];

treeGrid.forEach((row, rowNum, rowArr) =>
  row.forEach((pos, posNum, posArr) => {
    if (
      rowNum > 0 &&
      rowNum < rowArr.length - 1 &&
      posNum > 0 &&
      posNum < posArr.length - 1
    ) {
      visibilityScores.push(getVisibilityScore(rowNum, posNum));
    }
  })
);

const highestVisibilityScore = visibilityScores.sort((a, b) => b - a)[0];

console.log(highestVisibilityScore);
// 259308
