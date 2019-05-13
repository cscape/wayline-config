const GTFSFetcher = require('./fetch-gtfs')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const AdmZip = require('adm-zip')

const parseCSV = csv => {
  const rows = csv
    .split('\n')
    .slice(1)
    .filter(a => String(a).trim() !== '')
    .map(a => a.replace(/"/gm, '')) // remove all quotes from row
    .map(a => a.split(',')) // make columns
    .map(a => ({
      route_id: String(a[0]),
      route_shortname: String(a[2]),
      route_longname: String(a[3])
    }))
  return rows
}

const extractAndParse = zipfile => {
  let csv
  zipfile.getEntries().forEach(entry => {
    if (entry.entryName !== 'routes.txt') return
    csv = zipfile.readAsText(entry)
  })
  const final = parseCSV(csv)
  return final
}

const getRouteNamesFromGTFS = async (url = 'https://www.miamidade.gov/transit/googletransit/current/google_transit.zip') => {
  const hash = crypto.createHash('sha256')
  hash.update(url) // unique hash based on URL
  const gHash = hash.digest('hex')
  const binaryData = await GTFSFetcher(url)
  const output = path.join(process.cwd(), `./${gHash}.tmp.zip`)
  await fs.writeFileSync(output, binaryData)

  const routes = extractAndParse(new AdmZip(output))
  fs.unlinkSync(output)
  return routes
}

module.exports = getRouteNamesFromGTFS
