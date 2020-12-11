const fs = require('fs')

const OCCUPIED = '#'
const EMPTY = 'L'
const FLOOR = '.'

let seats = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split('\n')
    .map(s => s.split(''))

const display = arr => arr.map(s => s.join('')).join('\n')

const isLeftFree = (arr, y, x, byDistance) => {
    if( x === 0 ) return { isFree: true }

    // const arrays = arr[y].slice(b, )

    return {
        isFree: [EMPTY, FLOOR].includes(arr[y][x - 1]),
        char: arr[y][x - 1],
    }
}

const isRightFree = (arr, y, x) => {
    if( x === arr[y].length - 1 ) return { isFree: true }

    return {
        isFree: [EMPTY, FLOOR].includes(arr[y][x + 1]),
        char: arr[y][x + 1],
    }
}

const isTopFree = (arr, y, x) => {
    if( y === 0 ) return { isFree: true }

    return {
        isFree: [EMPTY, FLOOR].includes(arr[y - 1][x]),
        char: arr[y - 1][x],
    }
}

const isBottomFree = (arr, y, x) => {
    if( y === arr.length - 1) return { isFree: true }

    return {
        isFree: [EMPTY, FLOOR].includes(arr[y + 1][x]),
        char: arr[y + 1][x],
    }
}

const isTopLeftFree = (arr, y, x) => {
    if( y === 0 || x === 0) return { isFree: true }

    return  {
        isFree: [EMPTY, FLOOR].includes(arr[y - 1][x - 1]),
        char: arr[y - 1][x - 1],
    }
}

const isTopRightFree = (arr, y, x) => {
    if( y === 0 || x === arr[y].length - 1) return { isFree: true }

    return {
        isFree: [EMPTY, FLOOR].includes(arr[y - 1][x + 1]),
        char: arr[y - 1][x + 1],
    }
}

const isBottomLeftFree = (arr, y, x) => {
    if( y === arr.length - 1 || x === 0) return { isFree: true }

    return {
        isFree: [EMPTY, FLOOR].includes(arr[y + 1][x - 1]),
        char: arr[y + 1][x - 1],
    }
}

const isBottomRightFree = (arr, y, x) => {
    if( y === arr.length - 1 || x === arr[y].length - 1) return { isFree: true }

    return {
        isFree: [EMPTY, FLOOR].includes(arr[y + 1][x + 1]),
        char: arr[y + 1][x + 1],
    }
}

const isSeatFree = (arr, y, x, byDistance) => 
    isBottomFree(arr, y, x, byDistance).isFree &&
    isTopFree(arr, y, x, byDistance).isFree &&
    isLeftFree(arr, y, x, byDistance).isFree &&
    isRightFree(arr, y, x, byDistance).isFree &&
    isTopRightFree(arr, y, x, byDistance).isFree &&
    isTopLeftFree(arr, y, x, byDistance).isFree &&
    isBottomLeftFree(arr, y, x, byDistance).isFree &&
    isBottomRightFree(arr, y, x, byDistance).isFree

const nbOccupiedAround = (arr, y, x, byDistance) => [
    isBottomFree(arr, y, x, byDistance),
    isTopFree(arr, y, x, byDistance),
    isLeftFree(arr, y, x, byDistance),
    isRightFree(arr, y, x, byDistance),
    isTopRightFree(arr, y, x), byDistance,
    isTopLeftFree(arr, y, x, byDistance),
    isBottomLeftFree(arr, y, x, byDistance),
    isBottomRightFree(arr, y, x, byDistance)
].map(r => r.char).filter(a => a === OCCUPIED).length

const getNbOccupied = (nbOccupiedNeeded = 4, byDistance = false) => {
    let moves
    let copySeats = [...seats]

    while( moves !== 0 ) {
        moves = 0
        copySeats = copySeats.map((sRows, index) => {
            return sRows.map((s, j) => {
                if (s === FLOOR) return s

                if(s === EMPTY) {
                    if(isSeatFree(copySeats, index, j, byDistance)) {
                        moves+=1
                        return OCCUPIED
                    }
                }

                if( s === OCCUPIED) {
                    if( nbOccupiedAround(copySeats, index, j, byDistance) >= nbOccupiedNeeded) {
                        moves+=1
                        return EMPTY
                    }
                }
                return s
            })

        })
    }

    return copySeats
        .map(r => r
            .filter(c => c === OCCUPIED)
            .length
        )
        .reduce((a,b)=>a+b)
}

// 1
console.log(getNbOccupied(4, true))

// 2
console.log(getNbOccupied(5, false))