// import * as winston from 'winston';
// // import 'winston-daily-rotate-file';
// // import * as SlackHook from 'winston-slack-webhook-transport';
// // import * as winstonMongoDB from 'winston-mongodb';

// const transports = [];

// // Create and export the logger instance
// export const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports,
// });

import { createLogger, format, transports } from "winston";

// custom log display format
const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${stack || message}`
})

const options = {
  file: {
    filename: 'error.log',
    level: 'error'
  },
  console: {
    level: 'silly'
  }
}

// for development environment
const devLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat
  ),
  transports: [new transports.Console(options.console)]
}

// for production environment
const prodLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: 'combine.log',
      level: 'info'
    })
  ]
}

// export log instance based on the current environment
const instanceLogger = (process.env.NODE_ENV === 'production') ? prodLogger : devLogger

export const instance = createLogger(instanceLogger)
