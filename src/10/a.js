import { readFileSync } from 'fs';
// const input = readFileSync('./example.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');
const instructions = input
    .split(/\n/)
    .map((instruction) => instruction.split(' '));
let registerX = 1;
let cycles = [registerX]; // registerX value DURING that cycle
instructions.forEach((instruction) => {
    if (instruction[0] === 'noop') {
        cycles.push(registerX);
    }
    else {
        cycles.push(registerX);
        registerX += +instruction[1];
        cycles.push(registerX);
    }
});
let signalStrengthSum = 0;
for (let i = 20; i <= 240; i += 40) {
    signalStrengthSum += i * cycles[i - 1];
}
console.log(signalStrengthSum);
// 12460
//* PART TWO
const crtRows = 6;
const crtCols = 40;
const crtPixels = crtRows * crtCols;
const crt = Array.from({ length: crtRows }).map((row) => Array.from({ length: crtCols }));
for (let i = 0; i < crtPixels; i++) {
    const row = Math.floor(i / crtCols);
    const col = i % crtCols;
    const cycleVal = cycles[i];
    const spritePos = [cycleVal - 1, cycleVal, cycleVal + 1];
    if (spritePos.includes(col)) {
        crt[row][col] = '#';
    }
    else {
        crt[row][col] = '.';
    }
}
crt.forEach((row) => console.log(row.join('')));
// EZFPRAKL
