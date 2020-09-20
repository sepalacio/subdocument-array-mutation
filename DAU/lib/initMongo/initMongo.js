'use strict'

const debug = require('debug')('lib:initMongo')
const mongoose = require('mongoose')

let connection

const initMongo = async ({ uri, options }) => {
  if (!connection) {
    mongoose.Promise = global.Promise
    connection = await mongoose.createConnection(uri, options)

    debug('MongoDB Connection Created!')
  }

  return connection
}

module.exports = initMongo
