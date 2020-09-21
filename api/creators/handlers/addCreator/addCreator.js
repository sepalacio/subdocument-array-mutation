'use strict'

const DAU = require('../../../../DAU')
const { CustomError } = require('../../../../utils/errorTools')

const creatorsErrors = require('../../errors')

const duplicatedCreatorError = creatorsErrors('CreatorAlreadyExists')

const addNewCreator = async body => new DAU.Creator(body)

const saveCreator = creator => creator.save()

const formatResponse = creator => ({ id: creator._id })

const sendResponse = res => response => res.status(200).json(response)

const isDuplicatedCreator = error => error.code === 11000

const handleError = next => error => {
  isDuplicatedCreator(error) ? next(new CustomError(duplicatedCreatorError)) : next(error)
}

const addCreator = (req, res, next) => addNewCreator(req.body)
  .then(saveCreator)
  .then(formatResponse)
  .then(sendResponse(res))
  .catch(handleError(next))

module.exports = addCreator
