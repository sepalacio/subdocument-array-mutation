'use strict'

const dbLogger = logData => {
  // @todo: Send DB event data to an external logging tool
  console.error('Database Event: ', logData)
}

const logDatabaseError = event => {
  const logData = {
    severity: 'ERROR',
    eventName: 'DatabaseError',
    eventData: {
      error: event
    }
  }
  dbLogger(logData)
}

const logDatabaseDisconnected = event => {
  const logData = {
    severity: 'WARNING',
    eventName: 'DatabaseDisconnected',
    eventData: {
      event
    }
  }
  dbLogger(logData)
}

const logDatabaseReconnected = event => {
  const logData = {
    severity: 'WARNING',
    eventName: 'DatabaseReconnected',
    eventData: {
      event
    }
  }
  dbLogger(logData)
}

module.exports = {
  logDatabaseError,
  logDatabaseDisconnected,
  logDatabaseReconnected
}
