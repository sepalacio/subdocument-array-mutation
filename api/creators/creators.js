'use strict'

const express = require('express')
const asyncify = require('express-asyncify')

const addCreator = require('./handlers/addCreator')

const creators = asyncify(express.Router())

creators
  .post('/creators/', addCreator)

module.exports = creators
