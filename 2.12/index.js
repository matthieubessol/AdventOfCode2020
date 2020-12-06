const fs = require('fs')

const formatFile = () => fs
    .readFileSync('./input.txt')
    .toString()
    .split("\n")
    .map(l => formatLine(l))

const formatLine = (l) => {
    const  line = l.replace(':', '').split(/-| /) 
    
    return {
        min: +line[0],
        max: +line[1],
        char: line[2],
        pass: line[3],
    }
}

const checkCharOccurent = l => {
    const nbOcc = l.pass.split(l.char).length - 1

    return nbOcc >= l.min && nbOcc <= l.max
}

const checkCharPostion = l => 
    [l.pass[l.min - 1], l.pass[l.max - 1]].filter(c => c === l.char).length === 1

// 1
const arr = formatFile()
    .filter(l => checkCharOccurent(l))

// 2
const arr2 = formatFile()
    .filter(l => checkCharPostion(l))

console.log(arr.length, arr2.length)