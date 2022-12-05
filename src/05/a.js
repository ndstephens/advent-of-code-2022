import { readFileSync } from 'fs';
// const input = readFileSync('./example.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');
//* EXAMPLE STACK
// const stack = {
//   1: ['Z', 'N'],
//   2: ['M', 'C', 'D'],
//   3: ['P'],
// } as {
//   [key: number]: string[];
// };
//* INPUT STACK
const stack = {
    1: ['B', 'L', 'D', 'T', 'W', 'C', 'F', 'M'],
    2: ['N', 'B', 'L'],
    3: ['J', 'C', 'H', 'T', 'L', 'V'],
    4: ['S', 'P', 'J', 'W'],
    5: ['Z', 'S', 'C', 'F', 'T', 'L', 'R'],
    6: ['W', 'D', 'G', 'B', 'H', 'N', 'Z'],
    7: ['F', 'M', 'S', 'P', 'V', 'G', 'C', 'N'],
    8: ['W', 'Q', 'R', 'J', 'F', 'V', 'C', 'Z'],
    9: ['R', 'P', 'M', 'L', 'H'],
};
const instructions = input
    .split(/\n/)
    .map((row) => row.replace(/\D+(\d+)\D+(\d+)\D+(\d+)/, '$1 $2 $3'))
    .map((row) => row.split(' ').map(Number));
// console.log(instructions);
const procedure = (instruction) => {
    const [quantity, start, end] = instruction;
    //* PART ONE
    // stack[end].push(...stack[start].splice(-quantity).reverse());
    //* PART TWO
    stack[end].push(...stack[start].splice(-quantity));
};
instructions.forEach((set) => procedure(set));
console.dir(stack);
const finalMessage = Object.values(stack)
    .map((row) => row[row.length - 1])
    .join('');
console.log(finalMessage);
//* PART ONE
// TGWSMRBPN
//* PART TWO
// TZLTLWRNF
