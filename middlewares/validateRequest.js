'use strict'

const { validationError } = require('../utils/errorTools')

const handleValidationError = (getError, next) => validationError => validationError.isEmpty()
  ? next()
  : next(getError(validationError.array()))

const validateRequest = (req, _, next) => req.getValidationResult()
  .then(handleValidationError(validationError, next))

module.exports = validateRequest

module.exports.test = {
  handleRequestError: handleValidationError
}
