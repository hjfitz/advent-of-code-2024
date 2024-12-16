import { getInput } from "./util.js";

export async function part1() {
    const dataset = await getInput(2, 1)
    const safeDatasets = dataset.map(isReportSafe).filter(Boolean)
    console.log(safeDatasets.length)
}

function isReportSafe(report) {
    const entries = report.split(' ')
    let isSafeByNumbers = true
    for (let i = 0; i < (entries.length - 1); i++) {
	const cur = entries[i]
	const next = entries[i + 1]
	const diff = Math.abs(cur - next)
	if (diff > 3) {
	    isSafeByNumbers = false
	}
    }

    let isSafeByTrajectory = true
    let dir = null // up OR down
    for (let i = 0; i < (entries.length - 1); i++) {
	const cur = entries[i]
	const next = entries[i + 1]
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
