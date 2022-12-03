import { readFileSync } from 'fs';
const input = readFileSync('./input.txt');
// const input = readFileSync('./example.txt');
//* PART ONE
let tempArr = [];
const elves = input
    .toString()
    .split('\n')
    .reduce((acc, val, i, arr) => {
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
const elfTotals = elves.map((elf) => elf.reduce((acc, val) => acc + val));
const sortedCalories = elfTotals.sort((a, b) => b - a);
const mostCalories = sortedCalories[0];
console.log(mostCalories);
// 70374
//* PART TWO
const topThreeTotal = sortedCalories
    .slice(0, 3)
    .reduce((acc, val) => acc + val);
console.log(topThreeTotal);
// 204610
//* Experiment with a cleaner approach
const sortedCalories2 = readFileSync('./input.txt', 'utf-8')
    .split(/\n\n/)
    .map((elf) => elf.split(/\n/).map(Number))
    .map((elf) => elf.reduce((acc, val) => acc + val))
    .sort((a, b) => b - a);
const mostCalories2 = sortedCalories2[0];
console.log(mostCalories2);
const topThreeTotal2 = sortedCalories2
    .slice(0, 3)
    .reduce((acc, val) => acc + val);
console.log(topThreeTotal2);
