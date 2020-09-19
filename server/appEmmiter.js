'use strict'

const { EventEmitter } = require('events')

const events = {
  EXPRESS_ERROR: 'expressError'
}

class AppEmitter extends EventEmitter {
  constructor () {
    super()
    this.events = events
  }
}

const appEmitter = new AppEmitter()

module.exports = appEmitter
