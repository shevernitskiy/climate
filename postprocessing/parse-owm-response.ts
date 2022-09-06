import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.15/mod.ts'

// The filename is the first invocation argument
const filename = Deno.args[0] // Same name as downloaded_filename
const data = await readJSON(filename)

// Pluck a specific key off
// and write it out to a different file
// Careful! any uncaught errors and the workflow will fail, committing nothing.
const newfile = `post${filename}`
await writeJSON(newfile, { [Date.now()]: data })
