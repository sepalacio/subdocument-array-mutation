'use strict'

const getMentionUpdate = require('./getMentionUpdate')
const getPostUpdate = require('./getPostUpdate')

const isMentionSchema = post => ((post || {}).mentions)

const getStatement = creator => post => isMentionSchema(post)
  ? getMentionUpdate(creator, post)
  : getPostUpdate(creator, post)

const statementsReducer = (accumulator, statement) => ({
  ...accumulator,
  ...statement
})

const formatStatements = statements => statements.reduce(statementsReducer, {})

/**
 * @param {Object} mutation
 * @returns {Object} update statement - { "$add": { "posts": [{ "value": "four" }] } }
 */
function generateUpdateStatement ({ posts }) {
  const creator = this

  const statements = posts.map(getStatement(creator))
  const formatResponse = formatStatements(statements)

  return formatResponse
}

module.exports = generateUpdateStatement
