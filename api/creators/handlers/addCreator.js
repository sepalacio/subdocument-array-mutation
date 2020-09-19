'use strict'

const sendResponse = res => () => res.status(204).json({})

const addCreator = (req, res, next) => addCreator(req)
  .then(sendResponse(res))
  .catch(next)

module.exports = addCreator
