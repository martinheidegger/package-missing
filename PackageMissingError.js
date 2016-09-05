'use strict'

var assert = require('assert')
var MANY_MSG = 'ONE of the following commands:\n'
var ONE_MSG = 'the following command:\n$ npm install --save '

function PackageMissingError (task, recommendedPackages) {
  if (!(this instanceof PackageMissingError)) {
    return new PackageMissingError(task, recommendedPackages)
  }
  assert.equal(typeof task, 'string', 'Task (arg#0) needs to be a string.')
  task = task.trim()
  assert.ok(task.length > 0, 'The task (arg#0) may not be empty.')
  assert.ok(Array.isArray(recommendedPackages), 'The recommended packages (arg#1) has to be an array.')
  assert.ok(recommendedPackages.length > 0, 'The recommended packages (arg#1) may not be empty.')
  recommendedPackages.forEach(function (pkg, index) {
    assert.equal(typeof pkg, 'string', 'The recommended package (arg#1#' + index + ': ' + pkg + ' has to be a string.')
  })

  this.code = 'EPACKAGEMISSING'
  this.task = task
  this.recommendedPackages = recommendedPackages
  this.message = this.code + ': ' + this.task + '\nThis error can be easily fixed by running ' +
    (
      (recommendedPackages.length === 1)
      ? ONE_MSG + recommendedPackages[0]
      : MANY_MSG + recommendedPackages.map(function (pkg) {
        return '- $ npm install --save ' + pkg
    }).join('\n')
    )

  Error.captureStackTrace(this)
}

PackageMissingError.prototype = Object.create(Error.prototype)

module.exports = PackageMissingError
