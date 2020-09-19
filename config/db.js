'use strict'

const chalk = require('chalk')

const { NODE_ENV, MONGO_URL } = process.env

const config = {
  uri: MONGO_URL || 'mongodb://localhost:27017/sam', // Database name: sam (Subdocument Array Mutation)
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
}

NODE_ENV !== 'test' && console.info(chalk.cyan('DB:'), JSON.stringify(config, null, ' '))

module.exports = config
