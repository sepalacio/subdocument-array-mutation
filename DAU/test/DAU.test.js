'use strict'

const test = require('ava')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const cleanAfterTest = require('./helpers/cleanAfterTest')
const DAU = require('..')

test.before('Setup database models', async () => {
  await DAU.connect({
    mongooseConfig: {
      uri: `mongodb://localhost:27017/sam_DAU_${uuidv4()}`,
      options: { // fix deprecation warnings: https://mongoosejs.com/docs/deprecations.html
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: false
      }
    }
  })
})

cleanAfterTest(test, async () => {
  await DAU.connection.db.dropDatabase()
})

test('Return models', (t) => {
  t.is(typeof DAU.Creator, 'function', 'Should return Creator model')
  t.is(Object.keys(DAU.connection.models).length, 1, 'should return 1 model(s)')
  t.deepEqual(DAU.mongoose, mongoose, 'Should export the mongoose module')
})
