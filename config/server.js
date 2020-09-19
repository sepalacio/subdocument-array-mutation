'use strict'

const chalk = require('chalk')

const { NODE_ENV, SAM_PORT } = process.env

const config = {
  port: SAM_PORT || 7000
}

NODE_ENV !== 'test' && console.info(chalk.cyan('Server:'), JSON.stringify(config, null, ' '))

module.exports = config
