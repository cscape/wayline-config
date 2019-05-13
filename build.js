const fs = require('fs')
const path = require('path')
const toml = require('toml')
const loopFetch = require('./lib/loopfetch-gtfs')

const modjs = fs.createWriteStream('./module.js')
const tomlConfig = fs.readFileSync(path.resolve(__dirname, 'config.toml'), 'utf8')
const data = toml.parse(tomlConfig)

modjs.on('open', () => {
  console.log('Building module.js...')
  modjs.write(`/* eslint-disable */\n// THIS IS AN AUTO-GENERATED FILE, DO NOT MANUALLY MODIFY\n\n`)
  modjs.write(`module.exports = `)
  const prettyjson = require('./lib/format-json')(data)
  modjs.write(prettyjson)
  modjs.close()
  console.log('Built module.js')
})

const routesJS = fs.createWriteStream('./routes.js')
const gtfsMap = data.GTFSPlaces

routesJS.on('open', async () => {
  console.log('Building routes.js...')
  const routeMap = await loopFetch(gtfsMap)
  routesJS.write(`/* eslint-disable */\n// THIS IS AN AUTO-GENERATED FILE, DO NOT MANUALLY MODIFY\n\n`)
  routesJS.write(`module.exports = `)
  const prettyjson = require('./lib/format-json')(routeMap)
  routesJS.write(prettyjson)
  routesJS.close()
  console.log('Built routes.js')
})
