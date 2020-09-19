'use strict'

const test = require('ava')

const { logExpressError } = require('../appErrorsListeners')
const addAppListeners = require('../addAppListeners')

const appEmitter = addAppListeners()

test('add logExpressError listener to appEmitter', (t) => {
  const actual = appEmitter.listeners('expressError')

  const expected = [logExpressError]
  t.deepEqual(actual, expected, 'Should add logExpressError listener')
})
