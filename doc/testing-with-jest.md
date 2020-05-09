# Switched Testing to Jest

Installation

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