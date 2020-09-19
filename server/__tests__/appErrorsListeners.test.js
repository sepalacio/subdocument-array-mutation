'use strict'

const test = require('ava')
const sinon = require('sinon')

const { setupLogExpressError } = require('../appErrorsListeners').test

test('#setupLogExpressError()', async (t) => {
  const logger = sinon.stub()
  const req = {
    user: 'Jhon Doe'
  }
  const error = new Error('Express error')

  await setupLogExpressError(logger, 'eventName')({ req, error })

  const expected = {
    req,
    logEvent: {
      severity: 'ERROR',
      eventName: 'eventName',
      eventData: {
        error
      }
    }
  }
  t.true(logger.calledOnceWithExactly(expected), 'Should call logger with expected options')
})
