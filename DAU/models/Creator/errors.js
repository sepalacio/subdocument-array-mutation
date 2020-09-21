'use strict'

/**
 * Custom errors for Creators model
 */
const errors = new Map([
  ['CreatorAlreadyExists', {
    name: 'CreatorAlreadyExists',
    message: 'Creator already exists',
    status: 422
  }],
  ['operationNotSupported', {
    name: 'operationNotSupported',
    message: 'The update operation is not supported',
    status: 422
  }],
  ['CreatorNotFound', {
    name: 'CreatorNotFound',
    message: 'Creator not found',
    status: 404
  }],
  ['PostNotFound', {
    name: 'PostNotFound',
    message: 'Post not found',
    status: 404
  }],
  ['MentionNotFound', {
    name: 'MentionNotFound',
    message: 'Mention not found',
    status: 404
  }]
])

module.exports = name => errors.get(name)
