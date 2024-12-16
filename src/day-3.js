import { getInput } from "./util.js"


// warning: here be regex

async function getLines() {
    const input = await getInput(3, 1)
    return input.join('\n')
}

export async function part1() {
    const lines = await getLines()

    console.log([...lines.matchAll(/mul\([0-9]+,[0-9]+\)/g)]
	.map(mt => mt[0])
	.map(
	    sum => sum
		.replace(/[^0-9,]/g, '')
		.split(',')
		.map(Number)
		.reduce((a, c) => a * c, 1)
	)
	.reduce((a, c) => a + c, 0)
    )
}

export async function part2() {
    const lines = await getLines()

    const matches = [...lines.matchAll(/(do\(\)|don\'t\(\)|mul\([0-9]+,[0-9]+\))/g)].map(mt => mt[0])

    let total = 0
    let shouldDo = true
    for (const line of matches) {
	if (line === 'do()') {
	    shouldDo = true
	} else if (line === "don't()") {
	    shouldDo = false
	} else {
	    if (shouldDo) {
		total += line
		    .replace(/[^0-9,]/g, '')
		    .split(',')
		    .map(Number)
		    .reduce((a, c) => a * c, 1)
	    }
	}
    }

    console.log(total)
}

