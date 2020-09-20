'use strict'

const addValidations = (req, _, next) => {
  req.checkBody({
    name: {
      notEmpty: true,
      errorMessage: 'The Creator´s name is required'
    }
  })
  next()
}

module.exports = addValidations
