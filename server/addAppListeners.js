'use strict'

const { logDatabaseError, logDatabaseDisconnected, logDatabaseReconnected } = require('../utils/dbLogger')
const { handleFatalError } = require('../utils/logger')

const appEmmiter = require('./appEmmiter')
const { logExpressError } = require('./appErrorsListeners')

const addAppListeners = connection => {
  connection.on('error', logDatabaseError)
  connection.on('disconnected', logDatabaseDisconnected)
  connection.on('reconnected', logDatabaseReconnected)

  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)
  appEmmiter.on(appEmmiter.events.EXPRESS_ERROR, logExpressError)

  return appEmmiter
}

module.exports = addAppListeners
