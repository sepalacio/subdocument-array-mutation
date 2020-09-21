'use strict'

const mongoose = require('mongoose')

const creatorMethods = require('./methods')

const Schema = mongoose.Schema

const mentionSchema = new Schema({
  text: {
    type: String
  }
})

const postSchema = new Schema({
  value: {
    type: String
  },
  mentions: [mentionSchema]
})

const creatorSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    posts: [postSchema]
  },
  {
    timestamps: true
  }
)

creatorSchema.methods = creatorMethods

module.exports = {
  creatorSchema
}
