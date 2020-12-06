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

const getTotal = (sludges) => sludges
    .map(getNbTreesEncountered)
    .reduce((a, b) =>  a * b)

// 1
const nbTreesEncountered1 = getTotal([{x: 3, y: 1}])

// 2
const nbTreesEncountered2 = getTotal(
    [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2},
    ]
)

console.log(nbTreesEncountered1, nbTreesEncountered2)