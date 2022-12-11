import { readFileSync } from 'fs';
// const input = readFileSync('./example2.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');
const instructions = input
    .split(/\n/)
    .map((instruction) => instruction.split(' ').map((val, i) => (i === 1 ? +val : val)));
const START_VAL = 0;
const POSITIONS = Array.from({ length: 10 }).map((_knot, index) => ({
    index,
    curPos: [START_VAL, START_VAL],
}));
const TAIL_POSITIONS = [[START_VAL, START_VAL]];
//! PRINT GRID - DEBUGGING
// const grid = Array.from({ length: 30 }).map((row) =>
//   Array.from({ length: 30 }).map(() => '.')
// );
// POSITIONS.forEach((knot, i) => {
//   const index = 9 - i;
//   grid[29 - (POSITIONS[index].curPos[0] + 15)][
//     POSITIONS[index].curPos[1] + 15
//   ] = index.toString();
// });
// console.table(grid);
//! PRINT GRID
const posDiff = ([leadY, leadX], [followY, followX]) => {
    const yDiff = leadY - followY;
    const xDiff = leadX - followX;
    return [yDiff, xDiff];
};
const isTouching = ([yDiff, xDiff]) => {
    return Math.abs(yDiff) <= 1 && Math.abs(xDiff) <= 1;
};
const updatedHeadPosition = ([curY, curX], direction) => {
    switch (direction) {
        case 'R': {
            return [curY, curX + 1];
        }
        case 'L': {
            return [curY, curX - 1];
        }
        case 'U': {
            return [curY + 1, curX];
        }
        case 'D': {
            return [curY - 1, curX];
        }
    }
};
const moveFollower = ([yDiff, xDiff], curKnot) => {
    const yPos = curKnot.curPos[0];
    const xPos = curKnot.curPos[1];
    const yMove = Math.sign(yDiff) * 1;
    const xMove = Math.sign(xDiff) * 1;
    // one of the values must be 2
    if (yDiff === 0) {
        curKnot.curPos = [yPos, xPos + xMove];
    }
    else if (xDiff === 0) {
        curKnot.curPos = [yPos + yMove, xPos];
    }
    else if (Math.abs(yDiff) >= 1 || Math.abs(xDiff) >= 1) {
        curKnot.curPos = [yPos + yMove, xPos + xMove];
    }
};
//! DEBUGGING
// let counter = 0;
instructions.forEach(([direction, numMoves]) => {
    //! DEBUGGING
    // counter++;
    for (let i = 1; i <= numMoves; i++) {
        //! SET BREAKPOINT HERE IN "a.js"
        POSITIONS.forEach((curKnot, index) => {
            if (index === 0) {
                // HEAD knot
                curKnot.curPos = updatedHeadPosition(curKnot.curPos, direction);
            }
            else {
                // Follower knots
                const parentKnot = POSITIONS[index - 1];
                const diff = posDiff(parentKnot.curPos, curKnot.curPos);
                if (!isTouching(diff)) {
                    moveFollower(diff, curKnot);
                    if (index === 9) {
                        // TAIL knot
                        TAIL_POSITIONS.push(curKnot.curPos);
                    }
                }
            }
        });
        //! PRINT GRID - DEBUGGING
        // grid.forEach((row, ri) =>
        //   row.forEach((column, ci) => (grid[ri][ci] = '.'))
        // );
        // grid[29 - 15][15] = 'S';
        // POSITIONS.forEach((knot, i) => {
        //   const index = 9 - i;
        //   grid[29 - (POSITIONS[index].curPos[0] + 15)][
        //     POSITIONS[index].curPos[1] + 15
        //   ] = index.toString();
        // });
        // console.log('==> ', `${counter}:`, direction, i);
        // console.table(grid);
        //! PRINT GRID
    }
});
const uniqueTailPositions = [
    ...new Set(TAIL_POSITIONS.map(([posY, posX]) => `${posY.toString()},${posX.toString()}`)),
].length;
console.log(uniqueTailPositions);
// 2511
