# Switched Testing to Jest

The first part is a brief log of migrating the tests from the mocha tests in the book to jest. 
Note the second part about improving the tests with proper Mongo integration and Snapshots.

## Installation

    npm install --save-dev babel-cli babel-preset-env jest supertest superagent

Had to adapt the Express inclusion and the expect matchers a little bit to migrate to jest.

## Adapt jest config to work with mongoose
    console.warn
        Mongoose: looks like you're trying to test a Mongoose app with Jest's default jsdom test environment. Please make sure you read Mongoose's docs on configuring Jest to test Node.js apps: http://mongoosejs.com/docs/jest.html

Added jest config as described to package.json:

    "testEnvironment": "node"

## Jest Command line Options

    jest --watch

## Links
 * https://jestjs.io/
 * Testing Express: https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
 * expect: https://jestjs.io/docs/en/expect
 * https://mongoosejs.com/docs/jest.html
 * https://jestjs.io/docs/en/cli.html
 
 ## Don't forget to remove mocha!
 
      npm uninstall mocha
      npm uninstall chai
      npm uninstall chai-http
      
# Using MongoDB in Tests

The mechanism described in the book to use a test database has two disadvantages:
- test runs are dependent on an available mongo instance.
- switching to the test db depends on setting an environment variable to switch to the test database. 
  This is not enforced in the tests, and if forgotten, tests will possibly manipulate the main database.
  Although this would probably only happen on a developer's machine and not in production, it doesn't seem like a good idea.

To set up testing with mongo properly, I've followed the Documentation in https://jestjs.io/docs/en/mongodb
     
     npm install @shelf/jest-mongodb --save-dev

* adapted jest configuration in package.json
* added test/jest-mongodb-config.js
* created test/api/mongo.test.js


## Documentation
* https://jestjs.io/docs/en/mongodb
* Mongo Memory Server: shttps://github.com/nodkz/mongodb-memory-server

For the snapshots to work, I needed to use a fixed object id in testing.