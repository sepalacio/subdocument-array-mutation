'use strict'

const appEmmiter = require('./appEmmiter')

const logErrorEvent = logData => {
  // @todo: Send error event data to an external logging tool
  console.error(logData)
}

const setupLogExpressError = (errorLogger, eventName) => ({ req, error }) => errorLogger({
  req,
  logEvent: {
    severity: 'ERROR',
    eventName,
    eventData: {
      error
    }
  }
})

module.exports = {
  logExpressError: setupLogExpressError(logErrorEvent, appEmmiter.events.EXPRESS_ERROR)
}

module.exports.test = {
  setupLogExpressError
}
