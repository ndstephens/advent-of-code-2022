import { readFileSync } from 'fs';
// const input = readFileSync('./example.txt', 'utf-8');
const input = readFileSync('./input.txt', 'utf-8');
//* PART ONE
const isFullyContained = (val, range) => {
    return val >= range[0] && val <= range[1];
};
const isSectionFullyContained = (arr1, arr2) => {
    if (isFullyContained(arr1[0], arr2) && isFullyContained(arr1[1], arr2)) {
        return true;
    }
    else if (isFullyContained(arr2[0], arr1) &&
        isFullyContained(arr2[1], arr1)) {
        return true;
    }
    return false;
};
let fullCounter = 0;
const pairedAssignmentsFull = input
    .split(/\n/)
    .map((pair) => pair.split(',').map((sectionRange) => sectionRange.split('-').map(Number)))
    .forEach((assignments) => {
    if (isSectionFullyContained(assignments[0], assignments[1])) {
        fullCounter++;
    }
});
console.log(fullCounter);
// 580
//* PART TWO
const isPartiallyContained = (val, range) => {
    return val >= range[0] && val <= range[1];
};
const isSectionPartiallyContained = (arr1, arr2) => {
    if (isPartiallyContained(arr1[0], arr2) ||
        isPartiallyContained(arr1[1], arr2)) {
        return true;
    }
    else if (isPartiallyContained(arr2[0], arr1) ||
        isPartiallyContained(arr2[1], arr1)) {
        return true;
    }
    return false;
};
let partialCounter = 0;
const pairedAssignmentsPartial = input
    .split(/\n/)
    .map((pair) => pair.split(',').map((sectionRange) => sectionRange.split('-').map(Number)))
    .forEach((assignments) => {
    if (isSectionPartiallyContained(assignments[0], assignments[1])) {
        partialCounter++;
    }
});
console.log(partialCounter);
// 895
