const fs = require('fs')

const NB_ROWS = 127
const NB_COLUMNS = 7
const NB_ROWS_CHAR = 7
const MOVE_CHAR = ['B', 'R']

const boardingPasses = fs
    .readFileSync('./input.txt')
    .toLocaleString()
    .split('\n')
    .filter(b => b)
    .map(b => {
        // transform into move or not.
        const newArr = b.split('').map(c => MOVE_CHAR.includes(c) ? 1 : 0).join('')
        const rows = newArr.slice(0, NB_ROWS_CHAR)
        const cols = newArr.slice(NB_ROWS_CHAR, b.length)
        const id = parseInt(rows, 2) * 8 + parseInt(cols, 2)
        
        return {
            rows: parseInt(rows, 2), col: parseInt(cols, 2), id
        }
    })
    .sort((a, b) => a.id < b.id ? -1 : 0)

// 1
console.log(Math.max(...boardingPasses.map(el => el.id)))

// 2

const nextSeat = boardingPasses
    .slice(1, boardingPasses.length)
    .filter((a, index) => a.id - boardingPasses[index].id > 1)[0]

console.log(nextSeat.id - 1)