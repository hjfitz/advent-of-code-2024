import fs from 'node:fs/promises'

export async function getInput(dayNum, partNum) {
    const filename = `input-${dayNum}-${partNum}`
    const raw = await fs.readFile(`./src/inputs/${filename}`)
    const decoded = raw.toString().trim()
    const lines = decoded.split('\n').filter(Boolean)
    return lines
}
