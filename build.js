const fs = require('fs')
const path = require('path')
const toml = require('toml')

const modjs = fs.createWriteStream('./module.js')
const tomlConfig = fs.readFileSync(path.resolve(__dirname, 'config.toml'), 'utf8')
const data = toml.parse(tomlConfig)

modjs.on('open', () => {
  modjs.write(`// THIS IS AN AUTO-GENERATED FILE, DO NOT MANUALLY MODIFY\n\n`)
  modjs.write(`module.exports = `)
  const prettyjson = require('./lib/format-json')(data)
  modjs.write(prettyjson)
  modjs.close()
})
