'use strict'

const test = require('ava')
const sinon = require('sinon')

const { logExpressError } = require('../appErrorsListeners')
const addAppListeners = require('../addAppListeners')

const connection = {
  on: sinon.stub()
}

const appEmitter = addAppListeners(connection)

test('add logExpressError listener to appEmitter', (t) => {
  const actual = appEmitter.listeners('expressError')

  const expected = [logExpressError]
  t.deepEqual(actual, expected, 'Should add logExpressError listener')
})
