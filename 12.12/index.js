// pas tres propre
const fs = require('fs')

const instructions = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split('\n')
    .map(s => [s[0], parseInt(s.slice(1, s.length))])

const rotateShip = (ship, value) => {
    const nbRotation = value / 90
    const poles = ['E', 'S', 'W', 'N']
    const indexCurrent = poles.findIndex(s => s === ship.facing)
    const index = (indexCurrent + nbRotation) % poles.length

    const polesValues =  {
        [-3]: 'S',
        [-2]: 'W',
        [-1]: 'N',
        0: 'E',
        1: 'S',
        2: 'W',
        3: 'N',
    }

    ship.facing =  polesValues[index]
}

const moveShip = (ship, value) => {
    switch (ship.facing) {
        case 'E':
            ship.x += value
            break
        case 'W':
            ship.x -= value
            break
        case 'N':
            ship.y += value
            break
        case 'S':
            ship.y -= value
            break
    }
}

const moveShipPart2 = (ship, value) => {
    ship.x += value * ship.waypointX
    ship.y += value * ship.waypointY
}

const rotateShipPart2 = (ship, value) => {
    const nbRotation = (value / 90) % 4

    let newWaypointX = ship.waypointX
    let newWaypointY = ship.waypointY

    if (nbRotation === 2 || nbRotation === -2) {
      newWaypointX = -ship.waypointX
      newWaypointY = -ship.waypointY
    }
    if (nbRotation === -1 || nbRotation === 3) {
      newWaypointX = -ship.waypointY
      newWaypointY = ship.waypointX
    }
    if (nbRotation === 1 || nbRotation === -3) {
      newWaypointX = ship.waypointY
      newWaypointY = -ship.waypointX
    }

    ship.waypointX = newWaypointX
    ship.waypointY = newWaypointY
}

const runInstructionsPart1 = () => {
    let ship = {
        degrees: 0,
        facing: 'E',
        x: 0,
        y: 0,
    }

    instructions.forEach((instruction, i) => {
        switch(instruction[0]) {
            case 'F':
                moveShip(ship, instruction[1])
                break
            case 'N':
                ship.y += instruction[1]
                break
            case 'S':
                ship.y -= instruction[1]
                break
            case 'E':
                ship.x += instruction[1]
                break
            case 'W':
                ship.x -= instruction[1]
                break
            case 'R':
                rotateShip(ship, instruction[1])
                break
            case 'L':
                rotateShip(ship, -instruction[1])
                break
            default:
                break
        }
    })

    return Math.abs(ship.x) + Math.abs(ship.y)
} 

// 1
console.log(runInstructionsPart1())

// 2
const runInstructionsPart2 = () => {
    let ship = {
        degrees: 0,
        facing: 'E',
        waypointX: 10,
        waypointY: 1,
        x: 0,
        y: 0,
    }

    instructions.forEach((instruction, i) => {
        switch(instruction[0]) {
            case 'F':
                moveShipPart2(ship, instruction[1])
                break
            case 'N':
                ship.waypointY += instruction[1]
                break
            case 'S':
                ship.waypointY -= instruction[1]
                break
            case 'E':
                ship.waypointX += instruction[1]
                break
            case 'W':
                ship.waypointX -= instruction[1]
                break
            case 'R':
                rotateShipPart2(ship, instruction[1])
                break
            case 'L':
                rotateShipPart2(ship, -instruction[1])
                break
            default:
                break
        }
    })

    return Math.abs(ship.x) + Math.abs(ship.y)
} 
console.log(runInstructionsPart2())