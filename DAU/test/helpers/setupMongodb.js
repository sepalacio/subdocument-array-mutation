'use strict'

const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const setupMongodb = (suffix = 'test', options = {}) => ({
  uri: `mongodb://localhost:27017/sam_${suffix}_${uuidv4()}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false,
    ...options
  },
  connection: null,
  connect: async function () {
    if (!this.connection) {
      mongoose.Promise = global.Promise
      this.connection = await mongoose.createConnection(this.uri, this.options)
    }

    return this.connection
  },

  cleanup: function () {
    return this.connection.db.dropDatabase()
  }
})

module.exports = setupMongodb
