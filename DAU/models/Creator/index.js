'use strict'

const { creatorSchema } = require('./creatorSchema')

let Creator = null

const setupCreator = (connection) => {
  if (!Creator) {
    Creator = connection.model('Creator', creatorSchema)
  }

  return Creator
}

module.exports = setupCreator
