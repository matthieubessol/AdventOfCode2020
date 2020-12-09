const fs = require('fs')

const nbNumbersRequired = 25

const numbers = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split('\n')
    .map(n => parseInt(n))

const canBeSum = (arr, value) => {
    return !!arr.find(a => arr.find(b => a + b === value))
}

const valueNotMatching = numbers
    .slice(nbNumbersRequired, numbers.length)
    .find((nb, index) => !canBeSum(
        numbers.slice(index, index + nbNumbersRequired), 
        nb
    ))

// 1
console.log(valueNotMatching)

// 2
const weakValues = numbers
    .slice(nbNumbersRequired, numbers.length)
    .map((_, i) => numbers
        .slice(i, numbers.length)
        .map((__, j) => numbers.slice(i, j))
        .filter(a => a.length > 1)
        .filter(a => !a.find(b => b >= valueNotMatching))
    )
    .map(arrays => arrays
        .filter(arr => arr
            .reduce((a, b) => a + b) === valueNotMatching)
            .find(a => a.length > 1)
        )
    .find(l => l && l.length)

// 2
console.log(Math.min(...weakValues) + Math.max(...weakValues))


