import { readFileSync } from 'fs';

const input = readFileSync('./example.txt', 'utf-8');
// const input = readFileSync('./input.txt', 'utf-8');

// keep track of Tail position as a string..."-2,3"
// each "position" is a "Y,X" value relative to the starting point of "0,0"
// add each change of position into a Set so as to only keep unique values
// length of Set is the answer

// create an "isTouching" function
// both Y and X positions of HEAD and TAIL are only a difference of < or = 1 (absolute values)

// keep track of last 2 DIRECTIONS that HEAD moved (probably just keep track of all directions, pushing each new direction to end of an array)

// if "isTouching" is FALSE and one value of Y,X is 0 and the other is 2 then move TAIL one increment in the most recent direction that HEAD moved

// if "isTouching" is FALSE and one value of Y,X is 1 and the other is 2 then move TAIL one increment in each of the two most recent directions that HEAD moved ?????

// ========================
//!
// const grid = Array.from({ length: 30 }).map((row) =>
//   Array.from({ length: 30 }).map(() => '.')
// );

// console.table(grid);

// ========================

const instructions = input
  .split(/\n/)
  .map((instruction) =>
    instruction.split(' ').map((val, i) => (i === 1 ? +val : val))
  ) as Array<[DirectionType, number]>;
// )
//! .slice(0, 150) as Array<[DirectionType, number]>;

type DirectionType = 'R' | 'L' | 'U' | 'D';
type HorzDirType = 'R' | 'L';
type VertDirType = 'U' | 'D';

let recentHorzDir: HorzDirType;
let recentVertDir: VertDirType;

type PositionType = [number, number];

const START_VAL: number = 0;
let HEAD: PositionType = [START_VAL, START_VAL];
let TAIL: PositionType = [START_VAL, START_VAL];
const TAIL_POSITIONS: PositionType[] = [TAIL];

//! PRINT HEAD AND TAIL TO GRID
// grid[29 - (TAIL[0] + 15)][TAIL[1] + 15] = 'T';
// grid[29 - (HEAD[0] + 15)][HEAD[1] + 15] = 'H';
// console.table(grid);

const posDiff = (
  [headY, headX]: PositionType,
  [tailY, tailX]: PositionType
): PositionType => {
  const yDiff = headY - tailY;
  const xDiff = headX - tailX;

  return [yDiff, xDiff];
};

const isTouching = ([yDiff, xDiff]: PositionType) => {
  return Math.abs(yDiff) <= 1 && Math.abs(xDiff) <= 1;
};

const updatedPosition = (
  [curY, curX]: PositionType,
  direction: DirectionType
) => {
  switch (direction) {
    case 'R': {
      return [curY, curX + 1] as PositionType;
    }
    case 'L': {
      return [curY, curX - 1] as PositionType;
    }
    case 'U': {
      return [curY + 1, curX] as PositionType;
    }
    case 'D': {
      return [curY - 1, curX] as PositionType;
    }
  }
};

const moveTail = ([yDiff, xDiff]: PositionType, direction: DirectionType) => {
  // one of the values must be 2
  if (Math.abs(yDiff) === 0 || Math.abs(xDiff) === 0) {
    // move TAIL one increment in the most recent direction that HEAD moved
    TAIL = updatedPosition(TAIL, direction);
  } else if (Math.abs(yDiff) === 1 || Math.abs(xDiff) === 1) {
    // move TAIL one increment in each of the two most recent directions that HEAD moved
    TAIL = updatedPosition(TAIL, recentHorzDir);
    TAIL = updatedPosition(TAIL, recentVertDir);
  }
};

const getDirType = (direction: DirectionType) =>
  ['U', 'D'].includes(direction) ? 'V' : 'H';

instructions.forEach(([direction, numMoves], index) => {
  if (getDirType(direction) === 'V') {
    recentVertDir = direction as VertDirType;
  } else if (getDirType(direction) === 'H') {
    recentHorzDir = direction as HorzDirType;
  }

  for (let i = 1; i <= numMoves; i++) {
    HEAD = updatedPosition(HEAD, direction);

    const diff = posDiff(HEAD, TAIL);

    if (!isTouching(diff)) {
      moveTail(diff, direction);
      TAIL_POSITIONS.push(TAIL);
    }

    //! PRINT HEAD AND TAIL TO GRID
    // grid.forEach((row, ri) =>
    //   row.forEach((column, ci) => (grid[ri][ci] = '.'))
    // );
    // grid[29 - (TAIL[0] + 15)][TAIL[1] + 15] = 'T';
    // grid[29 - (HEAD[0] + 15)][HEAD[1] + 15] = 'H';
    // console.log('==> ', `${counter}:`, direction, i);
    // console.table(grid);
  }
});

const uniqueTailPositions = [
  ...new Set(
    TAIL_POSITIONS.map(
      ([posY, posX]) => `${posY.toString()},${posX.toString()}`
    )
  ),
].length;

console.log(uniqueTailPositions);
// 6332
