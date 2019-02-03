const toml = require('toml')
const fs = require('fs')
const tomlConfig = fs.readFileSync('./config.toml')

const data = toml.parse(tomlConfig)

module.exports = data
