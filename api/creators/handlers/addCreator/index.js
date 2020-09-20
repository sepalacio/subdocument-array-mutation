'use strict'

const validateRequest = require('../../../../middlewares/validateRequest')
const addValidations = require('./addValidations')
const addCreator = require('./addCreator')

module.exports = [
  addValidations,
  validateRequest,
  addCreator
]
