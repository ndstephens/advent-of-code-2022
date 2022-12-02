"use strict";
//* PART ONE
var _a, _b, _c, _d, _e, _f;
exports.__esModule = true;
// tsc a.ts -w
// nodemon a.js
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
var myStrategy = {
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS
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
// first is opponent, second is me
var outcomes = (_c = {},
    _c[ROCK] = (_d = {},
        _d[ROCK] = DRAW,
        _d[PAPER] = WIN,
        _d[SCISSORS] = LOSE,
        _d),
    _c[PAPER] = (_e = {},
        _e[ROCK] = LOSE,
        _e[PAPER] = DRAW,
        _e[SCISSORS] = WIN,
        _e),
    _c[SCISSORS] = (_f = {},
        _f[ROCK] = WIN,
        _f[PAPER] = LOSE,
        _f[SCISSORS] = DRAW,
        _f),
    _c);
// turn each round into an array of 2 strings
// Ex. ['A', 'Y']
// then...
// const [oppChoice, myChoice] = round
// Ex. oppChoice = 'A', myChoice = 'Y'
// record points for your choice
// Ex. shapeScore = shapePoints[myStrategy[myChoice]]
// record point for round outcome
// Ex. roundScore = roundPoints[outcome[opponentStrategy[oppChoice]][myStrategy[myChoice]]]
var input = (0, fs_1.readFileSync)('./input.txt', 'utf-8');
// const input = readFileSync('./example.txt', 'utf-8');
var roundsTotal = input
    .split(/\n/)
    .map(function (round) {
    var _a = round.split(' '), oppChoice = _a[0], myChoice = _a[1];
    var shapeScore = shapePoints[myStrategy[myChoice]];
    var roundScore = roundPoints[outcomes[opponentStrategy[oppChoice]][myStrategy[myChoice]]];
    return shapeScore + roundScore;
})
    .reduce(function (acc, cur) { return acc + cur; });
console.log(roundsTotal);
// 10941
