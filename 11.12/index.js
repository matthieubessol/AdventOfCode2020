const fs = require('fs')

const OCCUPIED = '#'
const EMPTY = 'L'
const FLOOR = '.'

let seats = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split('\n')
    .map(s => s.split(''))

const isLeftFree = (arr, y, x, byDistance) => {
    if( x === 0 ) return { isFree: true }
    const begin = byDistance ? x - 1 : 0
    const places = arr[y].slice(begin, x)
    const firstSeat = places.reverse().filter(s => s === EMPTY || s === OCCUPIED)[0]

    return {
        isFree: firstSeat !== OCCUPIED,
        char: [firstSeat],
    }
}   

const isRightFree = (arr, y, x, byDistance) => {
    if( x === arr[y].length - 1 ) return { isFree: true }

    const end =  byDistance ? x + 2 : arr[y].length
    const places = arr[y].slice(x + 1, end)
    const firstSeat = places.filter(s => s === EMPTY || s === OCCUPIED)[0]

    return {
        isFree: firstSeat !== OCCUPIED,
        char: [firstSeat],
    }
}

const isTopFree = (arr, y, x, byDistance) => {
    if( y === 0 ) return { isFree: true }

    const begin = byDistance ? y - 1 : 0
    const places = arr.slice(begin, y).map(s => s[x])
    const firstSeat = places.reverse().filter(s => s === EMPTY || s === OCCUPIED)[0]

    return {
        isFree: firstSeat !== OCCUPIED,
        char: [firstSeat],
    }
}

const isBottomFree = (arr, y, x, byDistance) => {
    if( y === arr.length - 1) return { isFree: true }

    const end = byDistance ? y + 2 : arr.length
    const places = arr.slice(y + 1, end).map(s => s[x])
    const firstSeat = places.filter(s => s === EMPTY || s === OCCUPIED)[0]

    return {
        isFree: firstSeat !== OCCUPIED,
        char: [firstSeat],
    }
}

const isTopLeftFree = (arr, y, x, byDistance) => {
    if( y === 0 || x === 0) return { isFree: true }

    let places = []
    let i = x - 1
    let j = y - 1
    while(i >= 0 && j >= 0 && arr[j][i]) {
        places.push(arr[j][i])
        i--
        j--
    }

    places = byDistance ? places.slice(0, 1) : places
    const firstSeat = places.filter(s => s === EMPTY || s === OCCUPIED)[0]

    return {
        isFree: firstSeat !== OCCUPIED,
        char: [firstSeat],
    }
}

const isTopRightFree = (arr, y, x, byDistance) => {
    if( y === 0 || x === arr[y].length - 1) return { isFree: true }

    let places = []
    let i = x + 1
    let j = y - 1
    while(i <= arr[y].length - 1 && j >= 0 && arr[j][i]) {
        places.push(arr[j][i])
        i++
        j--
    }

    places = byDistance ? places.slice(0, 1) : places
    const firstSeat = places.filter(s => s === EMPTY || s === OCCUPIED)[0]

    return {
        isFree: firstSeat !== OCCUPIED,
        char: [firstSeat],
    }
}

const isBottomLeftFree = (arr, y, x, byDistance) => {
    if( y === arr.length - 1 || x === 0) return { isFree: true }

    let places = []
    let i = x - 1
    let j = y + 1
    while(i >= 0 && j <= arr.length - 1 && arr[j][i]) {
        places.push(arr[j][i])
        i--
        j++
    }

    places = byDistance ? places.slice(0, 1) : places
    const firstSeat = places.filter(s => s === EMPTY || s === OCCUPIED)[0]

    return {
        isFree: firstSeat !== OCCUPIED,
        char: [firstSeat],
    }
}

const isBottomRightFree = (arr, y, x, byDistance) => {
    if( y === arr.length - 1 || x === arr[y].length - 1) return { isFree: true }

    let places = []
    let i = x + 1
    let j = y + 1
    while(i <= arr[y].length - 1 && j <= arr.length - 1 && arr[j][i]) {
        places.push(arr[j][i])
        i++
        j++
    }

    places = byDistance ? places.slice(0, 1) : places
    const firstSeat = places.filter(s => s === EMPTY || s === OCCUPIED)[0]

    return {
        isFree: firstSeat !== OCCUPIED,
        char: [firstSeat],
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

const nbOccupiedAround = (arr, y, x, byDistance) => 
    [
        isBottomFree(arr, y, x, byDistance),
        isTopFree(arr, y, x, byDistance),
        isLeftFree(arr, y, x, byDistance),
        isRightFree(arr, y, x, byDistance),
        isTopRightFree(arr, y, x, byDistance),
        isTopLeftFree(arr, y, x, byDistance),
        isBottomLeftFree(arr, y, x, byDistance),
        isBottomRightFree(arr, y, x, byDistance)
    ]
    .filter(c => c && c.char)
    .map(r => r.char.join(''))
.filter(a => a.includes(OCCUPIED)).length

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