const fs = require('fs')

const arr = fs
    .readFileSync('./file.txt')
    .toString()
    .split("\n")
    .map(l => +(l))
    .filter(l => l)
    
const res = arr.filter(
    (a) => arr.filter(b => arr.filter(c => c + a + b === 2020).length).length
)

return console.log(res[0] * res[1] * res[2])