const fs = require('fs')

const intTo36Bytes = (dec) => dec
    .toString(2)
    .padStart(36, "0")
    .split('')
    .map(s => parseInt(s))

const applyMask = (value, mask, keepX = false) => {
    const valueBytes = intTo36Bytes(value)

    return valueBytes.map((b, i) => {
        if(mask[i] === 'X') return keepX ? 'X' : b
        if( mask[i] === '0') return b
        return parseInt((mask[i]))
    })
}

const readInt = (array) => [...array]
    .reverse()
    .map((b, i) => b * Math.pow(2, i))
    .reduce((a, b) => a + b)

let curMask
const mems = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split('\n')
    .map(s => {
        if(s.includes('mask')) {
            curMask = s.split('mask = ')[1].split('')

            return {
                type: 'mask',
                value: curMask,
            }
        } else {
            const value = BigInt(s.split("=")[1])
            const valueWithMask = readInt(applyMask(value, curMask))

            return {
                type: 'mem',
                position: parseInt(s.split('=')[0].replace(/\D/g,'')),
                value: value,
                valueWithMask
            }
        }
    })
    .filter(l => l.type === 'mem')

const memPositionsPart1 = [...new Set(mems.map(a => a.position))]

const total = memPositionsPart1
    .map((n) => [...mems]
        .reverse()
        .find(a => a.position === n)
    )
    .map(n => n.valueWithMask)
    .reduce((a, b) => {
        // console.log('a + b', a,b)
        return Number(Number(a) + Number(b))
    })

// // 1
console.log(total)

// 2

const getAllPossibilities = (arr, pre) => { 
    pre = pre || '';

    if (!arr.length) { 
        return pre
    }
    var ans = arr[0].reduce(
        (ans, value) => ans.concat(getAllPossibilities(arr.slice(1), pre + value)), 
        []
    )

    return ans
} 

const getAllInts = (positions) => {
    const possibilities = positions.map(s => s === 'X' ? [0, 1] : [s])
    
    return getAllPossibilities(possibilities)
}

const mems2 = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split('\n')
    .map(s => {
        if(s.includes('mask')) {
            curMask = s.split('mask = ')[1].split('')

            return {
                type: 'mask',
                value: curMask,
            }
        } else {
            const value = parseInt(s.split("=")[1])
            const position = parseInt(s.split('=')[0].replace(/\D/g,''))
            const positions = getAllInts(applyMask(position, curMask, true))

            return {
                type: 'mem',
                positions: positions.map(p => readInt(p.split(''))),
                value: (value),
            }
        }
    })
    .filter(l => l.type === 'mem')

const memPositionsPart2 = [...new Set(mems2.map(p => p.positions).flat())]

const totalPart2 = memPositionsPart2
    .map((n) => [...mems2]
        .reverse()
        .find(a => a.positions.includes(n))
    )
    .map(n => n.value)
    .reduce((a, b) => Number(Number(a) + Number(b)))

console.log(totalPart2)