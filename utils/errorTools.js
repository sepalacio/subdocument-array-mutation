'use strict'

class CustomError extends Error {
  constructor ({ message, name, status, code, error } = {}) {
    super()

    this.message = message
    this.name = name
    this.status = status
    this.code = code
    this.error = error
  }
}

const validationError = (errors) => new CustomError({
  message: 'Validation error',
  name: 'ValidationError',
  code: 'validation_error',
  status: 400,
  error: errors
})

module.exports = {
  CustomError,
  validationError
}
