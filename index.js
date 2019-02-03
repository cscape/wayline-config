const toml = require('toml')
const fs = require('fs')
const path = require('path')
const tomlConfig = fs.readFileSync(path.resolve(__dirname, 'config.toml'), 'utf8')

const data = toml.parse(tomlConfig)

module.exports = data
