const fs = require('fs')

const COLOR_TO_KEEP = 'shiny gold bag'

const bags = fs
    .readFileSync('./input.txt')
    .toLocaleString()
    .split('\n')
    .filter(b => !b.includes('no other bags'))
    .map(b => {
        const color = b.split('contain')[0].trim()
        const colorsIn = b.replace('.', '').split('contain')[1].split(',').map(s => s.trim())

        return {
            color,
            colorsIn
        }
    })

const findBag = s => {
    const inColor = s.replace(/[^a-zA-Z ]+/g, '').trim()
    const inColorFormatted = inColor[inColor.length - 1] !== 's' ? `${inColor}s` : inColor

    return bags.find(nb => nb.color === inColorFormatted)
}

const canHoldShinny = b => {
    const canHold = b.colorsIn.filter(s => {
        if (s.includes(COLOR_TO_KEEP)) return true
    
        const curBag = findBag(s)    
        if(!curBag) return false

        return canHoldShinny(curBag)
    }).length

    return canHold > 0
}

const countBags = (bag, sum) => {
    if(!bag || !bag.colorsIn) return sum


    return bag.colorsIn.map(b => {
        const curBag = findBag(b)
        const nbBag = parseInt(b.replace(/\D/g,''))
        
        return nbBag + nbBag * countBags(curBag, sum)
    }).reduce((a, b) => a + b)
}



// 1
const shinnyHolders = bags.filter(canHoldShinny).length
console.log(shinnyHolders)

// 2
const shinnyBag = bags.find(b => b.color === `${COLOR_TO_KEEP}s`)
console.log(countBags(shinnyBag, 0))