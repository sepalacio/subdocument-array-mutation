'use strict'

const test = require('ava')

const cleanAfterTest = require('../../../../test/helpers/cleanAfterTest')
const db = require('../../../../test/helpers/setupMongodb')('cretorMethods')
const setupCreator = require('../..')

test.before('Setup database', async (t) => {
  const connection = await db.connect()
  t.context = {
    Creator: setupCreator(connection)
  }
})

cleanAfterTest(test, async () => {
  await db.cleanup()
})

require('./helpers/testGenerateUpdateStatement.test')
