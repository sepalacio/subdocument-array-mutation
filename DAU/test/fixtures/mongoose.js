'use strict'

const writeResult = (n) => ({
  n,
  nModified: n,
  ok: 1
})

const ObjectId = (id) => {
  function Id (value) {
    this.value = value
  }
  Id.prototype.toString = function toString () {
    return this.value
  }

  return new Id(id)
}

module.exports = {
  ObjectId,
  writeResult
}
