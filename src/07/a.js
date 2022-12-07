import { readFileSync } from 'fs';
// const input = readFileSync('./example.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');
let fs = {
    name: 'root',
    parent: null,
    totals: [0],
    subDirs: {},
};
const dirList = [fs];
let currentLocation = fs;
input.split(/\n/).forEach((instruction) => {
    var _a, _b;
    const cmd = instruction.split(' ');
    if (cmd[0] === '$') {
        if (cmd[1] === 'cd') {
            if (cmd[2] === '/') {
                //* $ cd /
                currentLocation = fs;
            }
            else if (cmd[2] === '..') {
                //* $ cd ..
                if (currentLocation.parent) {
                    currentLocation = currentLocation.parent;
                }
            }
            else {
                //* $ cd <dirname>
                if (!((_a = currentLocation.subDirs) === null || _a === void 0 ? void 0 : _a[cmd[2]])) {
                    currentLocation.subDirs[cmd[2]] = {
                        name: cmd[2],
                        parent: currentLocation,
                        totals: [0],
                        subDirs: {},
                    };
                    dirList.push(currentLocation.subDirs[cmd[2]]);
                }
                currentLocation = currentLocation.subDirs[cmd[2]];
            }
        }
    }
    else if (cmd[0] === 'dir') {
        //* dir <dirname>
        if (!((_b = currentLocation.subDirs) === null || _b === void 0 ? void 0 : _b[cmd[1]])) {
            currentLocation.subDirs[cmd[1]] = {
                name: cmd[1],
                parent: currentLocation,
                totals: [0],
                subDirs: {},
            };
            dirList.push(currentLocation.subDirs[cmd[1]]);
        }
        currentLocation.totals.push(currentLocation.subDirs[cmd[1]]);
    }
    else if (typeof +cmd[0] === 'number') {
        currentLocation.totals.push(+cmd[0]);
    }
});
const getTotal = (dir) => {
    let total = 0;
    dir.totals.forEach((val) => {
        if (typeof val === 'number') {
            total += val;
        }
        else {
            total += getTotal(val);
        }
    });
    return total;
};
const totals = dirList
    .map((dir) => getTotal(dir))
    .filter((val) => val <= 100000)
    .reduce((acc, cur) => acc + cur);
//* PART ONE
console.log(totals);
// 1543140
//* PART TWO
const totalSpaceNeeded = dirList.map((dir) => getTotal(dir))[0] - 40000000;
const dirSizeToDelete = dirList
    .map((dir) => getTotal(dir))
    .filter((dir) => dir >= totalSpaceNeeded)
    .sort((a, b) => a - b)[0];
console.log(dirSizeToDelete);
// 1117448
