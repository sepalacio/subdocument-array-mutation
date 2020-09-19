'use strict'

const express = require('express')

const creators = require('./creators')

const routes = express.Router()

routes.use(creators)

module.exports = routes
