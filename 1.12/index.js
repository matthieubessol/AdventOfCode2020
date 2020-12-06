const fs = require('fs')

const arr = fs
    .readFileSync('./input.txt')
    .toString()
    .split("\n")
    .map(l => +(l))
    .filter(l => l)
    
const res = arr.filter(
    (a) => arr.filter(b => arr.filter(c => c + a + b === 2020).length).length
)

const total = res.reduce((a, b) => a * b)

return console.log(total)