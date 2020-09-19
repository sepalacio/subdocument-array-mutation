'use strict'

const { handleFatalError } = require('../utils/logger')

const appEmmiter = require('./appEmmiter')
const { logExpressError } = require('./appErrorsListeners')

const addAppListeners = () => {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)
  appEmmiter.on(appEmmiter.events.EXPRESS_ERROR, logExpressError)

  return appEmmiter
}

module.exports = addAppListeners
