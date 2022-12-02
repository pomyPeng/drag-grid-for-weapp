module.exports = function deepClone(obj) {
  var objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object' && obj != null) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}