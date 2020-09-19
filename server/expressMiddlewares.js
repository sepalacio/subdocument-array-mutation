'use strict'

const expressValidator = require('express-validator')

/**
 * Setup main express middlewares
 * @param {Object} app Express application object
 */
const expressMiddlewares = (app) => {
  app.use(expressValidator())
}

module.exports = expressMiddlewares
