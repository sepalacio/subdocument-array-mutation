'use strict'

const { CustomError } = require('../../../../../utils/errorTools')

const { supportedOperations } = require('../../../../config/creators')
const getOperation = require('./getOperation')
const errors = require('../../errors')

const operationNotSupportedError = errors('operationNotSupported')
const postNotFoundError = errors('PostNotFound')

const buildAddStatement = ({ post }) => ({
  $add: {
    posts: [post]
  }
})

const buildUpdateStatement = ({ postIndex, post }) => {
  const statement = {
    $update: {}
  }
  const statementKey = `posts.${postIndex}.value`

  statement.$update[statementKey] = post.value

  return statement
}

const buildRemoveStatement = ({ postIndex, post }) => {
  const statement = {
    $remove: {}
  }
  const statementKey = `posts.${postIndex}`

  statement.$remove[statementKey] = true

  return statement
}

const statements = {
  $add: buildAddStatement,
  $update: buildUpdateStatement,
  $remove: buildRemoveStatement
}

const getPostUpdateStatement = ({ postIndex, post, operation }) => statements[operation]({ postIndex, post })

const matchPost = postiId => post => `${post._id}` === `${postiId}`

const getPostIndex = (creator, post) => creator.posts.findIndex(matchPost(post._id))

const isNotAddOperation = operation => operation !== supportedOperations.add

const postNotFound = postIndex => postIndex === -1

const getPostUpdate = (creator, post) => {
  const operation = getOperation(post)

  if (!operation) {
    throw new CustomError(operationNotSupportedError)
  }

  const postIndex = getPostIndex(creator, post)
  if (postNotFound(postIndex) && isNotAddOperation(operation)) {
    throw new CustomError(postNotFoundError)
  }

  return getPostUpdateStatement({
    postIndex,
    post,
    operation
  })
}

module.exports = getPostUpdate
