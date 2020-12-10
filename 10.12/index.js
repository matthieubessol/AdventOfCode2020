const fs = require('fs')

let moves = [0, 0, 0]

const numbers = fs
    .readFileSync('./input.txt')
    .toLocaleString()
    .split('\n')
    .map(s => parseInt(s))
    .sort((a, b) => a - b)

numbers.unshift(0)

numbers.forEach((a, i) => {
    const diff = (numbers[i + 1] || a + 3) - a
    moves[diff - 1]++
})

// 1
console.log(moves[0] * moves[2])

// 2
numbers.push(numbers[numbers.length - 1] + 3)
let stepPossibilities = { 0: 1 }

numbers.forEach((a, i) => {
    numbers
        .slice(i + 1, i + 4)
        .filter(b => b - a <= 3)
        .forEach((_, j) => {
            stepPossibilities[i + 1 + j] = (stepPossibilities[i + 1 + j] || 0) + stepPossibilities[i]
        })        
})

// 2
console.log(stepPossibilities[numbers.length - 1])