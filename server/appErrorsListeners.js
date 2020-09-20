'use strict'

const appEmmiter = require('./appEmmiter')

const logErrorEvent = logData => {
  // @todo: Send error data to an external logging tool
  console.error(logData)
}

const setupLogExpressError = (errorLogger, eventName) => ({ req, error }) => errorLogger({
  params: req.params,
  body: req.body,
  method: req.method,
  headers: req.headers,
  url: req.originalUrl,
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
