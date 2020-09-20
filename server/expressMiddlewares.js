'use strict'

const express = require('express')

const expressValidator = require('express-validator')

/**
 * Setup main express middlewares
 * @param {Object} app Express application object
 */
const expressMiddlewares = (app) => {
  app.use(express.urlencoded({
    extended: false
  }))

  app.use(express.json({
    limit: '50mb'
  }))

  app.use(expressValidator())
}

module.exports = expressMiddlewares
