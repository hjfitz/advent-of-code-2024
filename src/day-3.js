import { getInput } from "./util.js"

export async function part1() {
    const lines = await getInput(3, 1)


    console.log([...lines.join('\n').matchAll(/mul\([0-9]+,[0-9]+\)/g)]
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

