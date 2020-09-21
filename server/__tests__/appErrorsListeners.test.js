'use strict'

const test = require('ava')
const sinon = require('sinon')

const { setupLogExpressError } = require('../appErrorsListeners').test

test('#setupLogExpressError()', async (t) => {
  const logger = sinon.stub()
  const req = {
    user: 'Jhon Doe',
    params: {
      param1: 'a'
    },
    body: {
      param2: 'b'
    },
    method: 'POST',
    headers: {},
    url: '/api/creators'
  }
  const error = new Error('Express error')

  await setupLogExpressError(logger, 'eventName')({ req, error })

  const expected = {
    params: req.params,
    body: req.body,
    method: req.method,
    headers: req.headers,
    url: req.originalUrl,
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
