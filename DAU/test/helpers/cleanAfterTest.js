'use strict'

const cleanAfterTest = (test, cleanHandler) => {
  test.after.always('Clean test', cleanHandler)
  process.on('uncaughtException', () => cleanHandler())
  process.on('unhandledRejection', () => cleanHandler())
  process.on('SIGINT', () => cleanHandler())
}

module.exports = cleanAfterTest
