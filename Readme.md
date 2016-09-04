[![Build Status](https://travis-ci.org/martinheidegger/package-missing.svg?branch=master)](https://travis-ci.org/martinheidegger/package-missing) [![Coverage Status](https://coveralls.io/repos/github/martinheidegger/package-missing/badge.svg)](https://coveralls.io/github/martinheidegger/package-missing)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# package-missing

This, very simple but incredibly useful package contains a Constructor for the `PackageMissingError`.

## Usage

```javascript
const PackageMissingError = require('package-missing')

// What would work if another package was installed?
const task = 'Can not parse the file test.yml'

// What packages can be installed to make this work?
const recommendedPackages = [ 'js-yaml' ]

const error = new PackageMissingError(task, recommendedPackages)

// You can test for this code
error.code === 'EPACKAGEMISSING'

// ... or for the package-missing-error
error instanceof PackageMissingError

// The input is available to be processed
error.task === task
error.recommendedPackages === recommendedPackages

// The message recommends to install the mentioned packages
error.message === error.code + ': ' + error.message + '\n'
    + 'This error can be easily fixed by running ONE of the following commands:\n'
    + recommendedPackages.map((pkg) => '- npm install ' + pkg + ' --save').join('\n')

// The error comes with a stack, but if you don't like it ...
typeof error.stack === 'string'
```

## License
ISC
