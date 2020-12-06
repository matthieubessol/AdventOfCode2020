const fs = require('fs')

const inputs = fs
    .readFileSync('./input.txt')
    .toLocaleString()
    .split(/\n\s*\n/)


const nbApproval1 = inputs
    .map(s => [...new Set(s.replace(/(\r\n|\n|\r)/gm, ""))])
    .reduce((a, b) => (a.length || a) + b.length)

// 1
// console.log(nbApproval1)

// 2
const secondFormat = inputs
    .map(i => i.split('\n'))
    .map((i) => {
        const uniqueChars = [...new Set(i.join('').replace(/(\r\n|\n|\r)/gm, ""))]
        const nbPeople = i.length

        const allApproved = uniqueChars.filter(c => i.join('').split(c).length - 1 === nbPeople).length

        return allApproved
    })

console.log(secondFormat.reduce((a, b) => a + b))