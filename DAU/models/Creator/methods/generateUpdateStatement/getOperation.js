'use strict'

const { supportedOperations } = require('../../../../config/creators')

const isCreating = object => object.value || object.text

const checkIfCreating = object => isCreating(object) ? supportedOperations.add : undefined

const isUpdating = object => object._id

const checkIfUpdating = object => isUpdating(object) ? supportedOperations.update : checkIfCreating(object)

const isDeleting = object => object._delete

/**
 * @param {Object} object - post | mention
 * @return {String} updateOperation - '$add' | '$update' | '$remove'
 */
const getOperation = object => isDeleting(object)
  ? supportedOperations.remove
  : checkIfUpdating(object)

module.exports = getOperation
