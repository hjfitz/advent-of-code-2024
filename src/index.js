import fs from 'node:fs/promises'

const dayNum = process.argv[2]
const partNum = process.argv[3] || '1'

async function validate(dayNum) {
    const inputs = await fs.readdir('./src/inputs')
    const days = await fs.readdir('./src')

    const hasDay = days.find(d => d === `day-${dayNum}.js`)
    const hasInput = inputs.find(i => i === `input-${dayNum}-${dayNum}`)

    if (!hasDay) {
	console.error(`Unable to find day=${dayNum}`)
	console.error("Days: ")
	days.forEach(day => console.error(`> ${day}`))
	process.exit(1)
    }

    if (!hasInput) {
	console.error(`Unable to find input for day=${dayNum}, part=${partNum}`)
	console.error("Days: ")
	days.forEach(day => console.error(`> ${day}`))
	process.exit(1)
    }

}

async function run(dayNum, partNum) {
    const file = await import(`./day-${dayNum}.js`)
    const fn = file[`part${partNum}`]
    return fn()
}

validate(dayNum, partNum)

run(dayNum, partNum)
