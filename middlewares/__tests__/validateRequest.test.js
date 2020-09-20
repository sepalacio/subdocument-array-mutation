'use strict'

const test = require('ava')
const sinon = require('sinon')

const { handleRequestError } = require('../validateRequest').test

test('#handleRequestError - has not errors', (t) => {
  const next = sinon.stub()
  const requestError = {
    isEmpty: () => true
  }

  handleRequestError(null, next)(requestError)
  t.true(next.calledOnceWithExactly(), 'Should call next without params')
})

test('#handleRequestError - has errors', (t) => {
  const error = { name: 'ValidationError' }
  const validationError = sinon.stub().returns(error)
  const next = sinon.stub()
  const requestError = {
    isEmpty: () => false,
    array: () => []
  }

  handleRequestError(validationError, next)(requestError)
  t.true(validationError.calledOnceWithExactly([]), 'Should call validationError wiht error array')
  t.true(next.calledOnceWithExactly(error), 'Should call next with ValidationError')
})
