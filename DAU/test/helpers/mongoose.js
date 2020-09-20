'use strict'

function findInArrayById (_id) {
  const foundItem = this.find(item => item._id.toString() === _id)
  return !foundItem ? null : foundItem
}

function removeById (_id) {
  return this.filter(item => item._id.toString() === _id)
}

function addToSet (data) {
  this.push(data)
  return data
}

module.exports = {
  findInArrayById,
  removeById,
  addToSet
}
