'use strict'

const DAU = require('../../../../DAU')
const { CustomError } = require('../../../../utils/errorTools')
const creatorsErrors = require('../../errors')

const creatorNotFoundError = creatorsErrors('CreatorNotFound')

const getCreator = ({ id }) => DAU.Creator.findById(id)

const checkCreator = creator => {
  if (!creator) {
    throw new CustomError(creatorNotFoundError)
  }
  return creator
}

const getUpdateStatement = body => creator => creator.generateUpdateStatement(body)

const sendResponse = res => response => res.status(200).json(response)

const addCreator = (req, res, next) => getCreator(req.params)
  .then(checkCreator)
  .then(getUpdateStatement(req.body))
  .then(sendResponse(res))
  .catch(next)

module.exports = addCreator
