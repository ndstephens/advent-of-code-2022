import { readFileSync } from 'fs';

// const input = readFileSync('./example.txt');
const input = readFileSync('./input.txt');

//* PART ONE
const sortedCalories2 = readFileSync('./input.txt', 'utf-8')
  .split(/\n\n/)
  .map((elf) => elf.split(/\n/).map(Number))
  .map((elf) => elf.reduce((acc, val) => acc + val))
  .sort((a, b) => b - a);

const mostCalories2 = sortedCalories2[0];

console.log(mostCalories2);
// 70374

//* PART TWO
const topThreeTotal2 = sortedCalories2
  .slice(0, 3)
  .reduce((acc, val) => acc + val);

console.log(topThreeTotal2);
// 204610
