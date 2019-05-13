# config

Universal configuration data for Wayline, including transit feed URLs, aliasing, and more.

## Usage

```javascript
const config = require('@wayline/config')
console.log(config.basefeeds.MiamiDadeTransit)
// https://www.miamidade.gov/transit/WebServices/

const routes = require('@wayline/config/routes')
console.log(routes.MiamiDadeTransit[3].route_longname)
// DOWNTOWN-DOLPH MALL/AIRPORT VIA 7ST
```

The structure of [module.js](module.js) is based on [config.toml](config.toml).

## License

[MIT](LICENSE) © [Cyberscape](https://cyberscape.co/).
