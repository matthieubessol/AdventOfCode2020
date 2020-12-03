const fs = require('fs')

const TREE_CHAR = '#'

const lines = fs
    .readFileSync('./input.txt')
    .toLocaleString()
    .split('\n')
    .filter(l => l)

const getNbTreesEncountered = ({x, y}) => {
    let pos = {
        x: 0,
        y: 0,
    }
    
    let nbTrees = 0
    
    while(pos.y < lines.length-1) {
        pos.x += x
        pos.y += y
    
        const curChar = lines[pos.y][pos.x % lines[pos.y].length]
    
        if (curChar === TREE_CHAR)
            nbTrees++
    }

    return nbTrees
}

// 1
const nbTreesEncountered1 = 
    [
        {x: 3, y: 1},
    ]
    .map(getNbTreesEncountered)
    .reduce((a, b) =>  a * b)

console.log(nbTreesEncountered1)

// 2
const nbTreesEncountered2 = 
    [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2},
    ]
    .map(getNbTreesEncountered)
    .reduce((a, b) =>  a * b)

console.log(nbTreesEncountered2)