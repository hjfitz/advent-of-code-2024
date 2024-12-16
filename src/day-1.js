import { getInput } from './util.js'

function unzip(lines) {
    // assume a list of tuples [[a1, b1], [a2, b2]]
    // and transform to [a1, a2], [b1, b2]
    const first = []
    const second = []
    for (const tuple of lines) {
	const [firstItem, secondItem] = tuple.split(' ').filter(Boolean).map(elem => elem.trim())
	first.push(firstItem)
	second.push(secondItem)
    }
    return [first, second]
}

function sortByNum(a, b) {
    if (a > b) {
	return 1
    } else if (a < b) {
	return -1
    }
    return 0
}

export async function part1() {
    const dataset = await getInput(1, 1)
    const arrays = unzip(dataset)
    const [first, second] = arrays.map(arr => arr.sort(sortByNum))
    const dist = first.map((firstNum, idx) => {
	const secondNum = second[idx]
	return Math.abs(firstNum - secondNum)
    }).reduce((acc, cur) => acc + cur, 0)
    console.log(dist)
}

export async function part2() {
    const dataset = await getInput(1, 1)
    const [left, right] = unzip(dataset)

    const rightMap = new Map()
    for (const num of right) {
	if (rightMap.has(num)) {
	    rightMap.set(num, rightMap.get(num) + 1)
	} else {
	    rightMap.set(num, 1)
	}
    }

    let total = 0

    for (const num of left) {
	total += (num * rightMap.get(num) || 0)
    }

    console.log(total)
    
}
