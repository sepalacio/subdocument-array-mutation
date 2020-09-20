'use strict'

const DAU = require('../../../../DAU')
const { CustomError } = require('../../../../utils/errorTools')

const creatorsErrors = require('../../errors')

const duplicatedCreatorError = creatorsErrors('CreatorAlreadyExists')

const sendResponse = res => response => res.status(200).json(response)

const formatResponse = creator => ({ id: creator._id })

const saveCreator = ({ name }) => DAU.Creator.create({ name })

const isDuplicatedCreator = error => error.code === 11000

const handleError = next => error => {
  isDuplicatedCreator(error) ? next(new CustomError(duplicatedCreatorError)) : next(error)
}

const addCreator = (req, res, next) => saveCreator(req.body)
  .then(formatResponse)
  .then(sendResponse(res))
  .catch(handleError(next))

module.exports = addCreator
