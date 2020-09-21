'use strict'

const express = require('express')
const asyncify = require('express-asyncify')

const addCreator = require('./handlers/addCreator')
const getUpdateStatement = require('./handlers/getUpdateStatement')

const creators = asyncify(express.Router())

creators
  .get('/creators/:id/posts', getUpdateStatement)
  .post('/creators/', addCreator)

module.exports = creators
