import { readFileSync } from 'fs';
const input = readFileSync('./input.txt', 'utf-8');
//* EXAMPLE SIGNALS
const ex1 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
const ex2 = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
const ex3 = 'nppdvjthqldpwncqszvftbrmjlhg';
const ex4 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
const ex5 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
const subroutine = (signal, packetLength) => {
    let packetFound = false;
    let position = 0;
    while (!packetFound) {
        if ([...new Set([...signal.slice(position, position + packetLength)])]
            .length === packetLength) {
            packetFound = true;
        }
        else {
            position++;
        }
    }
    return position + packetLength;
};
//* PART ONE
console.log(subroutine(input, 4));
// 1760
//* PART TWO
console.log(subroutine(input, 14));
// 2974
