'use strict'
var test = require('tap').test
var PackageMissingError = require('../')

test('Require a task.', function (t) {
  t.throws(function () {
    PackageMissingError()
  })
  t.end()
})
test('Require the task to be a string.', function (t) {
  t.throws(function () {
    PackageMissingError(1)
  })
  t.end()
})
test('Require the task to be not empty.', function (t) {
  t.throws(function () {
    PackageMissingError(' ')
  })
  t.end()
})
test('Require the recommended packages to exist.', function (t) {
  t.throws(function () {
    PackageMissingError('foo')
  })
  t.end()
})
test('Require the recommended packages not be empty.', function (t) {
  t.throws(function () {
    PackageMissingError('foo', [])
  })
  t.end()
})
test('Require the recommended packages to be a strings.', function (t) {
  t.throws(function () {
    PackageMissingError('foo', [1])
  })
  t.end()
})
test('Require the recommended packages to be all strings.', function (t) {
  t.throws(function () {
    PackageMissingError('foo', ['bar', 1])
  })
  t.end()
})
test('Allow construction without new.', function (t) {
  var err = PackageMissingError('foo', ['bar'])
  t.ok(err instanceof Error)
  t.ok(err instanceof PackageMissingError)
  t.end()
})
test('Allow construction with just a string.', function (t) {
  var err = PackageMissingError('foo', 'bar')
  t.ok(err instanceof Error)
  t.ok(err instanceof PackageMissingError)
  t.end()
})
test('The inheritance should be correct.', function (t) {
  var err = new PackageMissingError('foo', ['bar'])
  t.ok(err instanceof Error)
  t.end()
})
test('The error should have a stack.', function (t) {
  var err = new PackageMissingError('foo', ['bar'])
  t.notSame(err.stack, null)
  t.end()
})
test('The error should maintain the task and recommended packages.', function (t) {
  var packages = ['bar']
  var task = 'foo'
  var err = new PackageMissingError(task, packages)
  t.equal(err.task, task)
  t.equal(err.recommendedPackages, packages)
  t.end()
})
test('The error should maintain the task and recommended packages.', function (t) {
  var packages = ['bar']
  var task = 'foo'
  var err = new PackageMissingError(task, packages)
  t.equal(err.code, 'EPACKAGEMISSING')
  t.end()
})
test('The error should compile a dependable message.', function (t) {
  var packages = ['bar']
  var task = 'foo'
  var err = new PackageMissingError(task, packages)
  t.equal(err.message, 'EPACKAGEMISSING: ' + task + '\n' +
    'This error can be easily fixed by running the following command:\n' +
    '$ npm install --save bar'
  )
  t.end()
})
test('The error should compile a dependable message that is different for multiline packages', function (t) {
  var packages = ['bar', 'baz']
  var task = 'foo'
  var err = new PackageMissingError(task, packages)
  t.equal(err.message, 'EPACKAGEMISSING: ' + task + '\n' +
    'This error can be easily fixed by running ONE of the following commands:\n' +
    '- $ npm install --save bar\n' +
    '- $ npm install --save baz'
  )
  t.end()
})
