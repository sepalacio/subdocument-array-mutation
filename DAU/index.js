'use strict'

const mongoose = require('mongoose')

const initMongo = require('./lib/initMongo')
const setupCreator = require('./models/Creator')

const createConnection = async ({ mongooseConfig = {} } = {}) => {
  const connection = await initMongo(mongooseConfig)

  setupCreator(connection)

  return {
    connection,
    ...connection.models
  }
}

module.exports = {
  connect: async function connect (options) {
    return Object.assign(this, await createConnection(options))
  },
  createConnection,
  mongoose
}
