var fs = require('fs')

const fieldsInfos = [
    { name: 'byr', required: true, type: 'year', min: 1920, max: 2002 },
    { name: 'iyr', required: true, type: 'year', min: 2010, max: 2020 },
    { name: 'eyr', required: true, type: 'year', min: 2020, max: 2030 },
    { 
        name: 'hgt', 
        required: true, 
        type: 'height',
        sizes: [
            { name: 'cm', min: 150, max: 193 },
            { name: 'in', min: 59, max: 76 }
        ],
    },
    { name: 'hcl', required: true, type: 'colorHex' },
    { name: 'ecl', required: true, type: 'color', colors: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'] },
    { name: 'pid', required: true, type: 'id' },
    { name: 'cid', required: false, },
]

const respectColorRule = ({colors}, colorValue) => colors.some((color) => colorValue.indexOf(color) !== -1)

const respectYearRule = ({min, max}, yearStr) => {
    try {
        return parseInt(yearStr) >= min && parseInt(yearStr) <= max
    } catch (error) {
        return false
    }
}

const respectColorHexRule = (_, color) => {
    const res = color.match(/^#[0-9a-f]{6,6}$/i)

    return !!(res && res.length)
}

const respectHeightRule = (field, height) => {
    try {
        return field.sizes.filter(size => {
            if (!height.includes(size.name)) return false

            const val = parseInt(height.replace(size.name, ''))

            return val >= size.min && val <= size.max
        }).length >= 1
    } catch (error) {
        return false
    }
}

const respectIdRule = (_, value) => !!value.match(/\d{9}/) && value.length === 9

const respectRules = (str, fields, checkRules = true) => {
    const res = fields.filter(f => f.required).every((field) => {
        
        if (str.indexOf(`${field.name}:`) === -1) {
            return false
        }

        if (!checkRules) {
            return true
        }

        const corres = `${str} `.match(new RegExp(`${field.name}:` + "(.*?)" + ' '))
        
        if(!corres || !corres.length) return false
        
        const value = corres[1]
        
        switch(field.type) {
            case 'year':
                return respectYearRule(field, value)
            case 'height':
                return respectHeightRule(field, value)
            case 'colorHex':
                return respectColorHexRule(field, value)
            case 'color':
                return respectColorRule(field, value)
            case 'id':
                return respectIdRule(field, value)
            default:
                return false
        }
    })

    return res
}

const passports = fs
    .readFileSync('input.txt')
    .toLocaleString()
    .split(/\n\s*\n/)
    .map(s => s.replace(/(\r\n|\n|\r)/gm, " "))

// 1
const nbValidPassports1 = passports.filter(s => respectRules(s, fieldsInfos, false)).length

// 2
const nbValidPassports2 = passports.filter(s => respectRules(s, fieldsInfos)).length


console.log(nbValidPassports1, nbValidPassports2)