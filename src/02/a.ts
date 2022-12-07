//* PART ONE

import { readFileSync } from 'fs';

type Opp = 'A' | 'B' | 'C';
type Me = 'X' | 'Y' | 'Z';

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const WIN = 'win';
const LOSE = 'lose';
const DRAW = 'draw';

const opponentStrategy = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
} as const;

const myStrategy = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
} as const;

const shapePoints = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
} as const;

const roundPoints = {
  [WIN]: 6,
  [LOSE]: 0,
  [DRAW]: 3,
} as const;

// first is opponent, second is me
const outcomes = {
  [ROCK]: {
    [ROCK]: DRAW,
    [PAPER]: WIN,
    [SCISSORS]: LOSE,
  },
  [PAPER]: {
    [ROCK]: LOSE,
    [PAPER]: DRAW,
    [SCISSORS]: WIN,
  },
  [SCISSORS]: {
    [ROCK]: WIN,
    [PAPER]: LOSE,
    [SCISSORS]: DRAW,
  },
} as const;

// turn each round into an array of 2 strings
// Ex. ['A', 'Y']

// then...
// const [oppChoice, myChoice] = round
// Ex. oppChoice = 'A', myChoice = 'Y'

// record points for your choice
// Ex. shapeScore = shapePoints[myStrategy[myChoice]]

// record point for round outcome
// Ex. roundScore = roundPoints[outcome[opponentStrategy[oppChoice]][myStrategy[myChoice]]]

// const input = readFileSync('./example.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');

const roundsTotal = input
  .split(/\n/)
  .map((round) => {
    const [oppChoice, myChoice] = round.split(' ') as [a: Opp, b: Me];
    const shapeScore = shapePoints[myStrategy[myChoice]];
    const roundScore =
      roundPoints[outcomes[opponentStrategy[oppChoice]][myStrategy[myChoice]]];
    return shapeScore + roundScore;
  })
  .reduce((acc, cur) => acc + cur);

console.log(roundsTotal);
// 10941
