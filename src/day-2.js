import { getInput } from "./util.js";

export async function parseInput() {
    const dataset = await getInput(2, 1)
    const parsedDataset = dataset.map(report => report.split(' ').map(Number))
    return parsedDataset
}

export async function part1() {
    const parsedDataset = await parseInput()
    const safeDatasets = parsedDataset.map(isReportSafe).filter(Boolean)

    console.log(safeDatasets.length)
}

export async function part2() {
    const dataset = await parseInput()
    const safeDatasets = dataset.map((set) => isReportSafeWithTolerance(set, 1)).filter(Boolean)

    console.log(safeDatasets.length)
}

function isReportSafeWithTolerance(report) {
    // brute-force and try every permutation

    // handle already safe reports
    if (isReportSafe(report)) {
	return true
    }

    // report isn't safe - try with each number removed
    for (let i = 0; i < report.length; i++) {
	const bruteReport = [...report.slice(0, i), ...report.slice(i + 1)]
	//console.log(bruteReport)
	const tolerableReport = isReportSafe(bruteReport)
	if (tolerableReport) {
	    return true
	}
    }
    return false
}

// this could be nicer
function isReportSafe(report) {
    let isSafeByNumbers = true
    for (let i = 0; i < (report.length - 1); i++) {
	const cur = report[i]
	const next = report[i + 1]
	const diff = Math.abs(cur - next)
	if (diff > 3) {
	    isSafeByNumbers = false
	}
    }

    let isSafeByTrajectory = true
    let dir = null // up OR down
    for (let i = 0; i < (report.length - 1); i++) {
	const cur = report[i]
	const next = report[i + 1]
	// check for same numbers
	isSafeByTrajectory = isSafeByTrajectory && cur !== next

	// dir for the current window
	const slideDir = cur - next > 0 ? 'down' : cur - next < 0 ? 'up' : null

	// initialise dir and don't check
	if (dir === null) {
	    dir = slideDir 
	} else {
	    if (slideDir !== null && slideDir !== dir) {
		isSafeByTrajectory = false
	    }
	}
    }

    return isSafeByNumbers && isSafeByTrajectory
}
