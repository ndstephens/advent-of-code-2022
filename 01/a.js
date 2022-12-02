"use strict";
// tsc a.ts -w
// nodemon a.js
exports.__esModule = true;
var fs_1 = require("fs");
var input = (0, fs_1.readFileSync)('./input.txt');
// const input = readFileSync('./example.txt');
//* PART ONE
var tempArr = [];
var elves = input
    .toString()
    .split('\n')
    .reduce(function (acc, val, i, arr) {
    if (val) {
        tempArr.push(+val);
    }
    else {
        acc.push(tempArr);
        tempArr = [];
    }
    if (i === arr.length - 1 && val) {
        acc.push(tempArr);
    }
    return acc;
}, []);
var elfTotals = elves.map(function (elf) { return elf.reduce(function (acc, val) { return acc + val; }); });
var sortedCalories = elfTotals.sort(function (a, b) { return b - a; });
var mostCalories = sortedCalories[0];
console.log(mostCalories);
// 70374
//* PART TWO
var topThreeTotal = sortedCalories
    .slice(0, 3)
    .reduce(function (acc, val) { return acc + val; });
console.log(topThreeTotal);
// 204610
//* Experiment with a cleaner approach
var sortedCalories2 = (0, fs_1.readFileSync)('./input.txt', 'utf-8')
    .split(/\n\n/)
    .map(function (elf) { return elf.split(/\n/).map(Number); })
    .map(function (elf) { return elf.reduce(function (acc, val) { return acc + val; }); })
    .sort(function (a, b) { return b - a; });
var mostCalories2 = sortedCalories2[0];
console.log(mostCalories2);
var topThreeTotal2 = sortedCalories2
    .slice(0, 3)
    .reduce(function (acc, val) { return acc + val; });
console.log(topThreeTotal2);
