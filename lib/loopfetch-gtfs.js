const getRouteNamesFromGTFS = require('./exec-gtfs')

module.exports = async (gtfsUrlMap) => {
  const routeMap = {}
  const keys = Object.keys(gtfsUrlMap)
  const vals = Object.values(gtfsUrlMap)
  for (let i = 0; i < keys.length; i += 1) {
    console.log(`Fetching ${vals[i]}`)
    routeMap[keys[i]] = await getRouteNamesFromGTFS(vals[i])
  }
  return routeMap
}
