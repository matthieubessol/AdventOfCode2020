const fs = require('fs')

const instructions = fs
    .readFileSync('./input.txt')
    .toLocaleString()
    .split('\n')
    .map((l, index) => ({
        index,
        incr: l.includes('-') ? '-' : '+',
        name: l.slice(0, 3),
        nbTimesPlayed: 0,
        value: parseInt(l.replace(/\D/g,'')),
    }))

const runCode = (oldArr) => {
    const arr = [...oldArr].map(a => ({
        ...a,
        nbTimesPlayed: 0
    }))

    let accumulator = 0
    let i
    for (i = 0; i < arr.length; i++) {
        if(arr[i].nbTimesPlayed > 0) {
            break
        }

        arr[i].nbTimesPlayed++

        switch (arr[i].name) {
            case 'nop':
                break
            case 'acc':
                if (arr[i].incr === '+') accumulator += arr[i].value
                else accumulator -= arr[i].value
                break
            case 'jmp':
                if (arr[i].incr === '+') i += arr[i].value - 1
                else i -= arr[i].value + 1
                break
            default:
                break
        }
    }
    
    return {
        accumulator,
        lastIndex: i
    }
}

// 1
console.log(runCode(instructions).accumulator)

const jumps = instructions.filter(i => i.name === 'jmp')

console.log(`Brute force ${jumps.length} attempts`)

const value = jumps.map(j => {
        const newArr = [...instructions].map((inst, index) => {
            if(index === j.index) {
                return {
                    ...j,
                    name: 'nop'
                }
            }

            return inst
        })

        return runCode(newArr)
    })
    .filter(j => j.lastIndex === instructions.length)[0]

console.log(value.accumulator)