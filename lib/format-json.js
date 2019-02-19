let p = []

const push = m => '\\' + p.push(m) + '\\'
const pop = (m, i) => p[--i]
const tabs = (count, indentType) => Array(++count).join(indentType)

const JSONFormat = (json, indentType) => {
  p = []
  let out = ''
  let indent = 0

  // Extract backslashes and strings
  json = json
    .replace(/\\./g, push)
    .replace(/(".*?"|'.*?')/g, push)
    .replace(/\s+/, '')

  // Indent and insert newlines
  for (let i = 0; i < json.length; i += 1) {
    const c = json.charAt(i)

    switch (c) {
      case '{':
      case '[':
        out += c + '\n' + tabs(++indent, indentType)
        break
      case '}':
      case ']':
        out += '\n' + tabs(--indent, indentType) + c
        break
      case ',':
        out += ',\n' + tabs(indent, indentType)
        break
      case ':':
        out += ': '
        break
      default:
        out += c
        break
    }
  }

  // Strip whitespace from numeric arrays and put backslashes
  // and strings back in
  out = out
    .replace(/\[[\d,\s]+?\]/g, function (m) {
      return m.replace(/\s/g, '')
    })
    .replace(/\\(\d+)\\/g, pop) // strings
    .replace(/\\(\d+)\\/g, pop) // backslashes in strings

  return out
}

module.exports = json => JSONFormat(JSON.stringify(json), '  ')
