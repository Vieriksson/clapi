export const createGuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

const stringToCamel = (str: string) => {
  str = str.replace(/[-_\s]+(.)?/g, (_, ch) => (ch ? ch.toUpperCase() : ''))
  return str.substr(0, 1).toLowerCase() + str.substr(1)
}

const objectToCamel = (obj: Object) =>
  Object.keys(obj).reduce((tutti, prop) => {
    tutti[stringToCamel(prop)] = obj[prop]
    return tutti
  }, {})

export const toCamelCase = (input: Object | Object[]) => {
  if (Array.isArray(input)) {
    return input.map(obj => objectToCamel(obj))
  }
  return objectToCamel(input)
}
