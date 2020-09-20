'use strict'

const setupModelTest = (t, modelName, setupModel, connection, schema) => {
  setupModel(connection)
  const Model = setupModel(connection)
  t.deepEqual(Model, schema, `Should return the ${modelName} model`)
  t.true(connection.model.calledOnceWith(modelName), 'Should create the model only once')
}

module.exports = setupModelTest
