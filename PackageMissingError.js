'use strict'

var assert = require('assert')
var ok = assert.ok
var equal = assert.equal
var MANY_MSG = 'ONE of the following commands:\n'
var ONE_MSG = 'the following command:\n$ npm install --save '

function PackageMissingError (task, recommended) {
  if (!(this instanceof PackageMissingError)) {
    return new PackageMissingError(task, recommended)
  }
  equal(typeof task, 'string', 'Task (arg#0) needs to be a string.')
  task = task.trim()
  ok(task.length > 0, 'The task (arg#0) needs to contain something.')
  if (typeof recommended === 'string') {
    recommended = [recommended]
  }
  ok(Array.isArray(recommended), 'The recommended packages (arg#1) has to be an array or a string.')
  ok(recommended.length > 0, 'The recommended packages (arg#1) may not be empty.')
  recommended.forEach(function (pkg, index) {
    equal(typeof pkg, 'string', 'The recommended package (arg#1#' + index + ': ' + pkg + ' has to be a string.')
  })

  this.code = 'EPACKAGEMISSING'
  this.task = task
  this.recommendedPackages = recommended
  this.message = this.code + ': ' + this.task + '\nThis error can be easily fixed by running ' +
    (
      (recommended.length === 1)
      ? ONE_MSG + recommended[0]
      : MANY_MSG + recommended.map(function (pkg) {
        return '- $ npm install --save ' + pkg
      }).join('\n')
    )

  Error.captureStackTrace(this)
}

PackageMissingError.prototype = Object.create(Error.prototype)

module.exports = PackageMissingError
