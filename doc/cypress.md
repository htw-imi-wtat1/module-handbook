# Cypress

Cypress is an easy-to-use end-to-end test framework.
It runs against a running instance of your server.

## Installation


    npm install cypress --save-dev


## Starting Cypress

    cypress open

or

    npm run cypress:open

## First Test

Just start [Writing your first test](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file).

### Notes
- start app outside of WebStorm, cypress could not connect to server running in WebStorm.


    npm start


## EsLint

(work in progress)

https://github.com/cypress-io/eslint-plugin-cypress


## Filling and sending forms, e.g. Login

* [Doc](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/logging-in__html-web-forms)

* Example: [user_registration_spec.js](../cypress/integration/users/user_registration_spec.js)


## Cypress on CI

* Set up Cypress Github Action in [.github/workflows/cypress.yml](../.github/workflows/cypress.yml)
* [Cypress GitHub Action](https://github.com/cypress-io/github-action)
* [Mongo Action for GitHub](https://github.com/marketplace/actions/mongodb-in-github-actions)

