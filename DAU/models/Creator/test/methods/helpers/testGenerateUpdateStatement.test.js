'use strict'

const test = require('ava')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

let Creator = null

test.serial.before(async (t) => {
  Creator = t.context.Creator
})

const addContentCreator = async (name) => {
  const contentCreator = await Creator.create({
    name,
    posts: [
      {
        value: 'one'
      },
      {
        value: 'two',
        mentions: [
          {
            text: 'apple'
          },
          {
            text: 'orange'
          }
        ]
      },
      {
        value: 'three',
        mentions: [
          {
            text: 'kiwi'
          }
        ]
      }
    ]
  })
  return contentCreator
}

test('.generateUpdateStatement(): Get update statement for $add operation on a POST', async (t) => {
  const contentCreator = await addContentCreator('Jhon Doe')
  const input = {
    posts: [
      {
        value: 'four'
      }
    ]
  }

  const actual = contentCreator.generateUpdateStatement(input)

  const expected = {
    $add: {
      posts: [
        { value: 'four' }
      ]
    }
  }
  t.deepEqual(actual, expected, 'Should return $add statement for a post')
})

test('.generateUpdateStatement(): Get update statement for $update operation on a POST', async (t) => {
  const contentCreator = await addContentCreator('Marc Joe')
  const post = contentCreator.posts[0]
  const input = {
    posts: [
      {
        _id: post._id,
        value: 'too'
      }
    ]
  }

  const actual = contentCreator.generateUpdateStatement(input)

  const expected = {
    $update: {
      'posts.0.value': 'too'
    }
  }
  t.deepEqual(actual, expected, 'Should return $update statement for a post')
})

test('.generateUpdateStatement(): Get update statement for $remove operation on a POST', async (t) => {
  const contentCreator = await addContentCreator('Jhonny')
  const post = contentCreator.posts[1]
  const input = {
    posts: [
      {
        _id: post._id,
        _delete: true
      }
    ]
  }

  const actual = contentCreator.generateUpdateStatement(input)

  const expected = {
    $remove: {
      'posts.1': true
    }
  }
  t.deepEqual(actual, expected, 'Should return $remove statement for a post')
})

test('.generateUpdateStatement(): Get update statement for $add operation on a MENTION', async (t) => {
  const contentCreator = await addContentCreator('Paul')
  const post2 = contentCreator.posts[1]
  const input = {
    posts: [
      {
        _id: post2._id,
        mentions: [
          {
            text: 'banana'
          }
        ]
      }
    ]
  }

  const actual = contentCreator.generateUpdateStatement(input)

  const expected = {
    $add: {
      'posts.1.mentions': { text: 'banana' }
    }
  }
  t.deepEqual(actual, expected, 'Should return $add statement for a mention')
})

test('.generateUpdateStatement(): Get update statement for $update operation on a MENTION', async (t) => {
  const contentCreator = await addContentCreator('Jack')
  const post3 = contentCreator.posts[2]
  const mention1 = contentCreator.posts[2].mentions[0]
  const input = {
    posts: [
      {
        _id: post3._id,
        mentions: [
          {
            _id: mention1._id,
            text: 'pear'
          }
        ]
      }
    ]
  }

  const actual = contentCreator.generateUpdateStatement(input)

  const expected = {
    $update: {
      'posts.2.mentions.0.text': 'pear'
    }
  }
  t.deepEqual(actual, expected, 'Should return $update statement for a mention')
})

test('.generateUpdateStatement(): Get update statement for $remove operation on a MENTION', async (t) => {
  const contentCreator = await addContentCreator('Maria')
  const post1 = contentCreator.posts[1]
  const mention1 = contentCreator.posts[1].mentions[1]
  const input = {
    posts: [
      {
        _id: post1._id,
        mentions: [
          {
            _id: mention1._id,
            _delete: true
          }
        ]
      }
    ]
  }

  const actual = contentCreator.generateUpdateStatement(input)

  const expected = {
    $remove: {
      'posts.1.mentions.1': true
    }
  }
  t.deepEqual(actual, expected, 'Should return $remove statement for a mention')
})

test('.generateUpdateStatement(): Get update statements for multiple operations at once', async (t) => {
  const contentCreator = await addContentCreator('Hammond')
  const post = contentCreator.posts[0]
  const pos2 = contentCreator.posts[1]
  const input = {
    posts: [
      {
        _id: post._id,
        value: 'too'
      },
      {
        value: 'four'
      },
      {
        _id: pos2._id,
        _delete: true
      }
    ]
  }

  const actual = contentCreator.generateUpdateStatement(input)

  const expected = {
    $update: { 'posts.0.value': 'too' },
    $add: {
      posts: [
        {
          value: 'four'
        }
      ]
    },
    $remove: { 'posts.1': true }
  }
  t.deepEqual(actual, expected, 'Should return 3 update statements: $update, $add, $remove')
})

test('.generateUpdateStatement(): Return PostNotFound error', async (t) => {
  const contentCreator = await addContentCreator('Marc Joe')
  const postId = ObjectId().toString()
  const input = {
    posts: [
      {
        _id: postId,
        value: 'too'
      }
    ]
  }

  const { name, message, status } = t.throws(() => contentCreator.generateUpdateStatement(input))

  const error = { name, message, status }

  const expected = {
    name: 'PostNotFound',
    message: 'Post not found',
    status: 404
  }
  t.deepEqual(error, expected, 'Should return PostNotFound error')
})

test('.generateUpdateStatement(): Return MentionNotFound error', async (t) => {
  const contentCreator = await addContentCreator('Robert')
  const post = contentCreator.posts[2]
  const mentionId = ObjectId().toString()
  const input = {
    posts: [
      {
        _id: post._id,
        mentions: [
          {
            _id: mentionId,
            value: 'too'
          }
        ]
      }
    ]
  }

  const { name, message, status } = t.throws(() => contentCreator.generateUpdateStatement(input))

  const error = { name, message, status }

  const expected = {
    name: 'MentionNotFound',
    message: 'Mention not found',
    status: 404
  }
  t.deepEqual(error, expected, 'Should return MentionNotFound error')
})

test('.generateUpdateStatement(): Return operationNotSupported error', async (t) => {
  const contentCreator = await addContentCreator('Graham')
  const input = {
    posts: [
      {
        item: '2'
      }
    ]
  }

  const { name, message, status } = t.throws(() => contentCreator.generateUpdateStatement(input))

  const error = { name, message, status }

  const expected = {
    name: 'operationNotSupported',
    message: 'The update operation is not supported',
    status: 422
  }
  t.deepEqual(error, expected, 'Should return operationNotSupported error')
})
