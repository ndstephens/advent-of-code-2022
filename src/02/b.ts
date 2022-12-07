//* PART TWO

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

//! NEW STRATEGY
const myStrategy = {
  X: LOSE,
  Y: DRAW,
  Z: WIN,
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

// first is opponent, second is outcome
const myChoice = {
  [ROCK]: {
    [LOSE]: SCISSORS,
    [DRAW]: ROCK,
    [WIN]: PAPER,
  },
  [PAPER]: {
    [LOSE]: ROCK,
    [DRAW]: PAPER,
    [WIN]: SCISSORS,
  },
  [SCISSORS]: {
    [LOSE]: PAPER,
    [DRAW]: SCISSORS,
    [WIN]: ROCK,
  },
} as const;

// turn each round into an array of 2 strings
// Ex. ['A', 'Y']

// then...
// const [oppChoice, myOutcome] = round
// Ex. oppChoice = 'A', myOutcome = 'Y'

// record points for your choice
// Ex. shapeScore = shapePoints[myChoice[opponentStrategy[oppChoice]][myStrategy[myOutcome]]]

// record point for round outcome
// Ex. roundScore = roundPoints[myStrategy[myOutcome]]

// const input = readFileSync('./example.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');

const roundsTotal = input
  .split(/\n/)
  .map((round) => {
    const [oppChoice, myOutcome] = round.split(' ') as [a: Opp, b: Me];
    const shapeScore =
      shapePoints[myChoice[opponentStrategy[oppChoice]][myStrategy[myOutcome]]];
    const roundScore = roundPoints[myStrategy[myOutcome]];
    return shapeScore + roundScore;
  })
  .reduce((acc, cur) => acc + cur);

console.log(roundsTotal);
// 13071
