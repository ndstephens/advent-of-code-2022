"use strict";
//* PART TWO
var _a, _b, _c, _d, _e, _f;
exports.__esModule = true;
// tsc b.ts -w
// nodemon b.js
var fs_1 = require("fs");
var ROCK = 'rock';
var PAPER = 'paper';
var SCISSORS = 'scissors';
var WIN = 'win';
var LOSE = 'lose';
var DRAW = 'draw';
var opponentStrategy = {
    A: ROCK,
    B: PAPER,
    C: SCISSORS
};
//! NEW STRATEGY
var myStrategy = {
    X: LOSE,
    Y: DRAW,
    Z: WIN
};
var shapePoints = (_a = {},
    _a[ROCK] = 1,
    _a[PAPER] = 2,
    _a[SCISSORS] = 3,
    _a);
var roundPoints = (_b = {},
    _b[WIN] = 6,
    _b[LOSE] = 0,
    _b[DRAW] = 3,
    _b);
// first is opponent, second is outcome
var myChoice = (_c = {},
    _c[ROCK] = (_d = {},
        _d[LOSE] = SCISSORS,
        _d[DRAW] = ROCK,
        _d[WIN] = PAPER,
        _d),
    _c[PAPER] = (_e = {},
        _e[LOSE] = ROCK,
        _e[DRAW] = PAPER,
        _e[WIN] = SCISSORS,
        _e),
    _c[SCISSORS] = (_f = {},
        _f[LOSE] = PAPER,
        _f[DRAW] = SCISSORS,
        _f[WIN] = ROCK,
        _f),
    _c);
// turn each round into an array of 2 strings
// Ex. ['A', 'Y']
// then...
// const [oppChoice, myOutcome] = round
// Ex. oppChoice = 'A', myOutcome = 'Y'
// record points for your choice
// Ex. shapeScore = shapePoints[myChoice[opponentStrategy[oppChoice]][myStrategy[myOutcome]]]
// record point for round outcome
// Ex. roundScore = roundPoints[myStrategy[myOutcome]]
var input = (0, fs_1.readFileSync)('./input.txt', 'utf-8');
// const input = readFileSync('./example.txt', 'utf-8');
var roundsTotal = input
    .split(/\n/)
    .map(function (round) {
    var _a = round.split(' '), oppChoice = _a[0], myOutcome = _a[1];
    var shapeScore = shapePoints[myChoice[opponentStrategy[oppChoice]][myStrategy[myOutcome]]];
    var roundScore = roundPoints[myStrategy[myOutcome]];
    return shapeScore + roundScore;
})
    .reduce(function (acc, cur) { return acc + cur; });
console.log(roundsTotal);
// 13071
