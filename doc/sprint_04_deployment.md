# Sprint 04: Deployment

## Linting with eslint

        npm install eslint --save-dev
        npx eslint --init

First run crashed with version 6.8.0, installed 7.0.0-rc.0 which worked.
You can find my config at .eslintrc.yml, I've tracked the questions in
doc/eslint-install.md
as they are different than the ones in the book.
You can make other choices if you want to.

* [https://www.jetbrains.com/help/webstorm/eslint.html](https://www.jetbrains.com/help/webstorm/eslint.html)
* [https://standardjs.com/]( https://standardjs.com/)   


## Debugger/Logger

### Logging
    export DEBUG=*
    node main.js

### oder über morgan

### debugger.

    node inspect main.js

    https://nodejs.org/en/docs/guides/debugging-getting-started/

    node: [DEP0062]: `node --debug` and `node --debug-brk` are invalid. Please use `node --inspect` and `node --inspect-brk` instead.

## Preparation: Linting, Debugging und Logging
### Linting with eslint

        npm install eslint --save-dev
        npx eslint --init

and then, for example, run:

        npx eslint main.js
        npx eslint coursesController.js --fix

First run crashed with version 6.8.0, installed 7.0.0-rc.0 which worked.
You can find my config at .eslintrc.yml, I've tracked the questions in
doc/eslint-install.md
as they are different than the ones in the book.
You can make other choices if you want to.

Just make sure that you use the same code formatting everywhere from now on!
Make a habit of checking your changes before committing.

Webstorm's format command doesn't pick up the eslint formatting rules, but
it is possible to run eslint automatically on save by configuring it under
"Languages & Frameworks => JavaScript => Code Quality tools"

* https://www.jetbrains.com/help/webstorm/eslint.html#
* https://standardjs.com/


### Logging
    export DEBUG=*
    node main.js

#### oder über morgan:

* installed morgan: npm install morgan
* use morgan in main.js:


    const morgan = require('morgan')
    app.use(morgan(":method :url :status * :response-time ms"))

### Debugger

    node inspect main.js

    https://nodejs.org/en/docs/guides/debugging-getting-started/

I use the debugger in JetBrains WebStorm. I had to create a second run configuration using plain node instead of nodemon to avoid this error:

    node: [DEP0062]: `node --debug` and `node --debug-brk` are invalid. Please use `node --    inspect` and `node --inspect-brk` instead.

* Debugging node in WebStorm: https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html#

## Deployment on Heroku

### Installing Heroku CLI

- Follow the Installation instructions for your Platform here: Heroku CLI:
[https://devcenter.heroku.com/articles/getting-started-with-nodejs](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

    heroku create

this automatically puts a new heroku remote into the git config, run

    cat .git/config

to confirm that if you are curious

### Create and Rename your Heroku app

Your app should be named according to your group name; please use this form: wtat1-group-x .

    heroku rename wtat1-module-handbook

### Preparing the Codebase

After setting up the heroku cli (command line interface), you can go straight to "Preparing your Codebase for Heroku Deployment":

- [Preparing a Codebase for Heroku Deployment](https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment)

*  [Add a Procfile](https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#3-add-a-procfile)


    echo "web: node main.js" > Procfile

* rename your app:


    heroku rename wtat1-module-handbook

## Testing with Mocha (note that I the test framework was switched to jest in sprint 05!)

    npm install mocha --save-dev
    npm install chai --save-dev
    npm i chai-http --save-dev

* Added tests as described in the chapter, except:
    * examples in book use arrow functions, the documentation advises not to: https://mochajs.org/#arrow-functions
    * more concise switching of environment specific configuration
    * we don't have user crud yet, but the test examples were easily transferable to course
    * created test for saving new courses in test/coursesControllerSaveSpec.js
    * (chose this structure to keep the examples simple)
    * I had to add `env: mocha: true` to .eslintrcyml to have eslint recognise describe and it


* Mocha: https://mochajs.org/
* Chai: https://www.chaijs.com/
* The examples uses the expect assertion syntax: https://www.chaijs.com/guide/styles/#expect
* https://www.chaijs.com/api/bdd/
* https://github.com/chaijs/chai-http

