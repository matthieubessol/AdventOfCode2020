// optimized thanks to https://www.reddit.com/r/adventofcode/comments/kc60ri/2020_day_13_can_anyone_give_me_a_hint_for_part_2/
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

// 1
console.log(busesSortedByRest[0].name * busesSortedByRest[0].r)

// 2
const [firstBus, ...busesPartTwo] = lines[1]
    .split(',')
    .map(s => parseInt(s))
    .map((s, i) => ({
        index: i,
        name: s,
        r: s - (curTime % s)
    }))
    .filter(s => s.name && s.name !== 'x')

let i = 0
let mult = firstBus.name
busesPartTwo.forEach(({name, index}) => {
  while (true) {
    if ((i + index) % name === 0) {
      mult *= name
      break
    }
    i += mult
  }
});

console.log(i)

// 556100168221141