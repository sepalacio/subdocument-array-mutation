'use strict'

const { CustomError } = require('../../../../../utils/errorTools')

const { supportedOperations } = require('../../../../config/creators')
const errors = require('../../errors')
const getOperation = require('./getOperation')

const operationNotSupportedError = errors('operationNotSupported')
const postNotFoundError = errors('PostNotFound')
const mentionNotFoundError = errors('MentionNotFound')

const buildAddStatement = ({ postIndex, mention }) => {
  const statement = {
    $add: {}
  }
  const statementKey = `posts.${postIndex}.mentions`

  statement.$add[statementKey] = mention

  return statement
}

const buildUpdateStatement = ({ postIndex, mentionIndex, mention }) => {
  const statement = {
    $update: {}
  }
  const statementKey = `posts.${postIndex}.mentions.${mentionIndex}.text`

  statement.$update[statementKey] = mention.text

  return statement
}

const buildRemoveStatement = ({ postIndex, mentionIndex }) => {
  const statement = {
    $remove: {}
  }
  const statementKey = `posts.${postIndex}.mentions.${mentionIndex}`

  statement.$remove[statementKey] = true

  return statement
}

const statements = {
  $add: buildAddStatement,
  $update: buildUpdateStatement,
  $remove: buildRemoveStatement
}

const getMentionUpdateStatement = ({
  postIndex,
  mentionIndex,
  mention,
  operation
}) => statements[operation]({ postIndex, mentionIndex, mention })

const matchPost = postiId => post => `${post._id}` === `${postiId}`

const getPostIndex = (creator, post) => creator.posts.findIndex(matchPost(post._id))

const matchMention = mentionId => mention => `${mention._id}` === `${mentionId}`

const getMentionIndex = (creator, mention, postIndex) => creator.posts[postIndex].mentions.findIndex(matchMention(mention._id))

const isNotAddOperation = operation => operation !== supportedOperations.add

const postNotFound = postIndex => postIndex === -1

const mentionNotFound = mentionIndex => mentionIndex === -1

const getMentionUpdate = (creator, post) => {
  const mention = post.mentions[0]

  const operation = getOperation(mention)
  if (!operation) {
    throw new CustomError(operationNotSupportedError)
  }

  const postIndex = getPostIndex(creator, post)
  if (postNotFound(postIndex)) {
    throw new CustomError(postNotFoundError)
  }

  const mentionIndex = getMentionIndex(creator, mention, postIndex)
  if (mentionNotFound(mentionIndex) && isNotAddOperation(operation)) {
    throw new CustomError(mentionNotFoundError)
  }

  return getMentionUpdateStatement({
    postIndex,
    mentionIndex,
    mention,
    operation
  })
}

module.exports = getMentionUpdate
