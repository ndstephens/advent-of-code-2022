import { readFileSync } from 'fs';
const input = readFileSync('./input.txt', 'utf-8');
// const input = readFileSync('./example.txt', 'utf-8');
const priorityValue = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const getPriorityValue = (item) => priorityValue.indexOf(item) + 1;
//* PART ONE
const priorityItemsSum = input
    .split(/\n/)
    .map((pack) => {
    const compartment1 = [...new Set([...pack.substring(0, pack.length / 2)])];
    const compartment2 = [...new Set([...pack.substring(pack.length / 2)])];
    const sharedItem = compartment1.filter((item) => compartment2.includes(item))[0];
    return getPriorityValue(sharedItem);
})
    .reduce((acc, cur) => acc + cur);
console.log(priorityItemsSum);
// 7863
//* PART TWO
let trackerObj = {};
const sumArr = [];
input.split(/\n/).forEach((pack, i, arr) => {
    const trimmedPack = [...new Set([...pack])];
    const tempObj = trimmedPack.reduce((acc, cur) => {
        acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
        return acc;
    }, trackerObj);
    if ((i + 1) % 3 === 0) {
        const commonItem = Object.keys(tempObj).filter((key) => tempObj[key] === 3)[0];
        sumArr.push(getPriorityValue(commonItem));
        trackerObj = {};
    }
});
const badgePrioritySum = sumArr.reduce((acc, cur) => acc + cur);
console.log(badgePrioritySum);
// 2488
