
const { time } = require('console')
const fs = require('fs')

const lines = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split('\n')

const curTime = parseInt(lines[0])
const buses = lines[1]
    .split(',')
    .filter(s => s !== 'x')
    .map(s => parseInt(s))
    .map(s => ({
        name: s,
        r: s - (curTime % s)
    }))

const busesSortedByRest = buses
    .sort((a, b) => a.r - b.r)

// // 1
console.log(busesSortedByRest[0].name * busesSortedByRest[0].r)

// // 2
const busesArrays = buses
    .sort((a, b) => a.name - b.name)


let allInTimes = false
let timestamp = 0
const busesPartTwo = lines[1]
    .split(',')
    .map(s => parseInt(s))
    .map((s, i) => ({
        index: i,
        name: s,
        r: s - (curTime % s)
    }))
    .filter(s => s.name && s.name !== 'x')
const firstBus = busesPartTwo[0]
console.log(busesPartTwo)

var date1 = new Date()
while(!allInTimes) {
    if(timestamp % firstBus.name === 0) {

        const ts = new Array(firstBus.name + 1)
            .fill(0)
            .map((_, i) => timestamp + i)

        
        const res = busesPartTwo.every((b) => 
                ts.some((t, index) => 
                    t%b.name === 0 && index === b.index
                )
            )
        

        allInTimes = res

    }

    // allInTimes=true
    timestamp += firstBus.name
}
var date2 = new Date();
console.log((date2 - date1)/1000)

// 556100168221141
console.log(timestamp - firstBus.name)
