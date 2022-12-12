import { readFileSync } from 'fs';

// const input = readFileSync('./example.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');

const monkeys = input.split(/\n\n/).map((monkey) =>
  monkey
    .split(/\n/)
    .filter((_note, i) => i !== 0)
    .map((note, i) => {
      if (i === 0) {
        return note.replace(/\D+()\D+/, '$1');
      } else if (i === 1) {
        return note.replace(/\D+(\+|\*)(\d+)?\D+/, '$1 $2');
      } else if (i === 2) {
        return +note.replace(/\D+(\d*)/, '$1');
      } else if (i === 3) {
        return +note.replace(/\D+(\d*)/, '$1');
      } else if (i === 4) {
        return +note.replace(/\D+(\d*)/, '$1');
      } else {
        return note;
      }
    })
    .map((note, i) => {
      if (i === 0) {
        return (note as string).split(', ').map(Number);
      } else if (i === 1) {
        return (note as string).split(' ');
      } else {
        return note;
      }
    })
) as Array<[number[], string[], number, number, number]>;

const inspectionTimes = Array.from({ length: monkeys.length }).map(
  (_monkey) => 0
);

const lowestCommonDenominator = monkeys.reduce((acc, cur) => acc * cur[2], 1);

//* PART ONE
// const numRounds = 20;

//* PART TWO
const numRounds = 10000;

for (let i = 0; i < numRounds; i++) {
  monkeys.forEach((monkey, monkeyIndex) => {
    const [items, [operator, worryAmt], test, ifTrue, ifFalse] = monkey;
    // go through items
    items.forEach((item) => {
      let worryLevel = 0;
      const operationVal = !worryAmt ? item : +worryAmt;
      if (operator === '*') {
        worryLevel = (item * operationVal) % lowestCommonDenominator;
      } else if (operator === '+') {
        worryLevel = item + operationVal;
      }

      //* PART ONE
      // worryLevel = Math.floor(worryLevel / 3);

      if (worryLevel % test === 0) {
        monkeys[ifTrue][0].push(worryLevel);
      } else {
        monkeys[ifFalse][0].push(worryLevel);
      }
      inspectionTimes[monkeyIndex] = inspectionTimes[monkeyIndex] + 1;
    });
    // clear items array
    monkey[0] = [];
  });
}

const [a, b] = inspectionTimes.sort((a, b) => b - a);

console.log(a * b);

//* PART ONE
// 62491

//* PART TWO
// 17408399184
