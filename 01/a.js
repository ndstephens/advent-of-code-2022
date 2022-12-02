"use strict";
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
