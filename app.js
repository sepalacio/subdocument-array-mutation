'use strict'

const { NODE_ENV } = process.env

NODE_ENV !== 'test' && console.info('*******************************************')

const chalk = require('chalk')
const express = require('express')
const asyncify = require('express-asyncify')

const api = require('./api')
const { port } = require('./config/server')
const addAppListeners = require('./server/addAppListeners')
const expressErrorHandler = require('./server/expressErrorHandler')
const expressMiddlewares = require('./server/expressMiddlewares')
const { name, version } = require('./package.json')

const { handleFatalError } = require('./utils/logger')

const app = asyncify(express())

expressMiddlewares(app)

app.get('/', (_, res) => {
  res.status(200).send('Welcome to SAM')
})

app.use('/api/', api)

expressErrorHandler(app)

const startServer = async () => {
  addAppListeners()

  app.listen(port, () => {
    console.info(chalk.green(`
${name} ${version}
Server running in http://localhost:${port}/
Running with NodeJS ${process.version}
Environment: ${NODE_ENV}`))
  })
}

// Run the server when this module is not required
if (!module.parent) {
  startServer().catch(handleFatalError)
}

// Export for testing
module.exports = app
