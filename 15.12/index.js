const fs = require('fs')

const getAllIndexes = (arr, val) => {
    var indexes = [], i = -1
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i)
    }
    return indexes
}

const firstNumbers = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split(',')
    .map(s => parseInt(s))

let numbers = [...firstNumbers]
let i = numbers.length - 1
while(i < 2020) {
    const lastNumber = numbers[i]
    const numberInArr = numbers
        .slice(0, i)
        .find(a => a === lastNumber)


    // if not in add it
    if(numberInArr >= 0) {
        const indexes = getAllIndexes(numbers, numberInArr).reverse().slice(0, 2)
        numbers.push(indexes[0] - indexes[1])
    } else if(!numberInArr) {
        numbers.push(0)
    }

    i++
}

console.log(numbers[2020-1])
