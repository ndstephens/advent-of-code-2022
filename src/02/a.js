//* PART ONE
import { readFileSync } from 'fs';
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
};
const myStrategy = {
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS,
};
const shapePoints = {
    [ROCK]: 1,
    [PAPER]: 2,
    [SCISSORS]: 3,
};
const roundPoints = {
    [WIN]: 6,
    [LOSE]: 0,
    [DRAW]: 3,
};
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
};
// turn each round into an array of 2 strings
// Ex. ['A', 'Y']
// then...
// const [oppChoice, myChoice] = round
// Ex. oppChoice = 'A', myChoice = 'Y'
// record points for your choice
// Ex. shapeScore = shapePoints[myStrategy[myChoice]]
// record point for round outcome
// Ex. roundScore = roundPoints[outcome[opponentStrategy[oppChoice]][myStrategy[myChoice]]]
const input = readFileSync('./input.txt', 'utf-8');
// const input = readFileSync('./example.txt', 'utf-8');
const roundsTotal = input
    .split(/\n/)
    .map((round) => {
    const [oppChoice, myChoice] = round.split(' ');
    const shapeScore = shapePoints[myStrategy[myChoice]];
    const roundScore = roundPoints[outcomes[opponentStrategy[oppChoice]][myStrategy[myChoice]]];
    return shapeScore + roundScore;
})
    .reduce((acc, cur) => acc + cur);
console.log(roundsTotal);
// 10941
