'use strict'

const { handleExpressError } = require('../utils/logger')

const appEmmiter = require('./appEmmiter')

const { EXPRESS_ERROR } = appEmmiter.events

/**
 * setup Express error handler
 * @param {Object} app Express application Object
 */
const expressErrorHandler = (app) => {
  app.use((err, req, res, next) => {
    appEmmiter.emit(EXPRESS_ERROR, {
      req,
      error: err
    })

    const error = handleExpressError(err)
    const status = error.status || 500

    res.status(status).send(error)
  })
}

module.exports = expressErrorHandler
