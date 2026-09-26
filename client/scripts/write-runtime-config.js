const fs = require('fs')
const path = require('path')

const apiUrl = (process.env.API_URL || 'http://localhost:3000/api').replace(/\/+$/, '')
const parsedUrl = new URL(apiUrl)

if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('API_URL must be an http or https URL.')
}

const outputPath = path.join(__dirname, '..', 'src', 'assets', 'runtime-config.js')
fs.writeFileSync(outputPath, `window.__APP_CONFIG__ = ${JSON.stringify({ apiUrl })};\n`)
