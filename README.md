# Example for Getting Programming with Node Sprints 02 - 05

![Node.js CI](https://github.com/htw-imi-wtat1/module-handbook/workflows/Node.js%20CI/badge.svg)

* for [WTAT1 SoSe 20](https://bkleinen.github.io/classes/ss2020/wtat1/topics/topic-04-first-express-app/)
* see backlog below
* App on Heroku: https://wtat1-module-handbook.herokuapp.com/

__Documentation Starting with Sprint 05 can be found in the [doc/](doc/) folder__
 
## Usage

* start with

    * production: node main.js
    * development: nodemon main.js  

    # Sprint 04: Deployment

    ## Linting with eslint

        npm install eslint --save-dev
        npx eslint --init

    First run crashed with version 6.8.0, installed 7.0.0-rc.0 which worked.
    You can find my config at .eslintrc.yml, I've tracked the questions in
    doc/eslint-install.md
    as they are different than the ones in the book.
    You can make other choices if you want to.

    https://www.jetbrains.com/help/webstorm/eslint.html#
    https://standardjs.com/


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



## Testing with Mocha

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


# Sprint 03

This sprint is about persisting data in the database.  
As I finally want my modules in the database, I will implement the story

| 015 | As a program creator, I can create new Courses for a program.

Note that this week is just about retrieving data and creating new simple records.

I've also created an example below how the database can be populated with test data using
mongoimport (not in the book), which I actually switched back during the next sprint
as the variant shown in the book using a seeding script in JavaScript makes seeding on
Heroku simpler and more secure. So rather follow the book right away on seeding.

## Mongo Installation

Installed mongo with docker. If you have docker installed on your machine,
you can just copy docker-compose.yml and use the scripts I've added to package.json:

    run npm mongobash   // runs docker-compose exec mongo bash
    run npm mongo       // docker-compose up -d


## Mongo Commands

after starting the cli with ``mongo``

    show dbs
    use courses
    show collections
    db.courses.findOne
    db.courses.deleteMany({})
    db.courses.update(..)

## Seeding the database

Lesson 15 ends with an example on how to seed the database using JavaScript.

I tried out mongoimport in the example app, which is easier to create, but
not as convenient to call. Seeding the database on heroku is easier if you
have a JavaScript script as described in the book, and safer as you don't have
to juggle your heroku database credentials around.

    mongoimport --uri "mongodb://localhost:27017/modulehandbook_db" --collection=courses data/seed/tryout
    mongoexport --uri "mongodb://localhost:27017/modulehandbook_db" --collection=courses  > data/seed/export    

## Documentation
- Mongoose: https://mongoosejs.com/
- Mongoose getting started: https://mongoosejs.com/docs/index.html
- Schema types: https://mongoosejs.com/docs/schematypes.html


# Sprint 01 & 02

## Stories implemented in Sprint 1 (Plain Node App in other repository)

Story_042 - As a student or lecturer, I see an overview of the whole study program with all modules including Title, Format and ECTS on the site.
Story_023 - As a student, I can quickly get an overview of the my progress within the study program.


## Step 1: Using Express

Create a new application using express, and migrate your existing views to the new express app. This may result in a new repository, but does not have to.
Chose one or more stories where you can make use of the two new technological topics you've learned in Unit 2: View Templates and Dynamic Content.ls

## Topic of the Week: View Templates and Dynamic Content


The second sprint - covering Unit 02 / Setting up an app with express.js
has the usage of html templates, layouts and partials at its core.
Migrate your pages and routes you created with plain node.js to express.
Pick out two more user stories such that one of them will use the same layout,
and another one possibly a different main layout of the page.


What can be shared, what needs to be different? Are different layouts or a combinations of partials the way to go?
Sketch the structure of the site for at least three stories clearly marking their
commonalities and differences.

### Layouts and Partials

Look at your whole backlog and choose a story or more that requires a different view from your first stories, and
implement it using layouts and partials.

- created layout.js and adapted views
- made a partial for navigation items, eliminating the need for stating the active path twice for marking active paths.

### Passing Parameters in Routes

| 014 | As a student, I can see the whole study plan in a tabular view.

I make use of passing parameters via the route to switch between the two view options. The controller switches to
a different view template depending on the parameter.
(I've also renamed the route from students to modules)


### Displaying Dynamic Content

Find a Story that can make use of Passing content from the controller to the view and displaying it with a view template.

For implementing this, I will touch story 023 again and fill it with complete courses information.

#### 023 - As a student, I can quickly get an overview of my progress within the study program.

- created content in homeController.js and added it to the [student's view](http://localhost:3002/students)

## Backlog


| #   | Story                                                                                                                                                                                                | Sprint       | Status                                     |
|:----|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------|:-------------------------------------------|
| 042 | As a student or lecturer, I see an overview of the whole study program with all modules including Title, Format and ECTS on the site.                                                                | Sprint 01    | Basic Implementation                       |
| 023 | As a student, I can quickly get an overview of the my progress within the study program.                                                                                                             | Sprint 01,02 | Basic Implementation, Data From Controller |
| 014 | As a student, I can see the whole course program in a tabular view.                                                                                                                                  | Sprint 02    | Done (without connection to db)            |
| 015 | As a program creator, I can create new Courses for a program.                                                                                                                                        | Sprint 03    | Done                                       |
| 001 | As a member of a consortium, I can edit module descriptions assigned to me such that they are immediately visible to my colleagues and everyone is clear about the newest version of the curriculum. |              |                                            |
| 002 | As someone responsible for the study program, I find a structure for module descriptions that aids me to design my modules in a way that is prepared for program accreditation.                      |              |                                            |
| 003 | As a Program or Module manager, I can update module descriptions for the forthcoming term such that they I can assure they are current while maintaining a history for former terms.                 |              |                                            |
| 004 | As a student, I can print out a description of the courses / modules I took during my studies to document my academic career.                                                                        |              |                                            |
| 005 | As a faculty manager, I can revise and supervise the module descriptions of all programs in my faculty.                                                                                              |              |                                            |
| 006 | As a program manager, I can revise and edit the module descriptions of all modules in my program up till a set deadline for each term.                                                               |              |                                            |
| 007 | As a module manager, I can edit the module descriptions of all modules assigned to me up till a set deadline for each term.                                                                          |              |                                            |
| 008 | As a student, I can see updated module descriptions at the beginning of each term and use them for planning my studies and selecting elective courses.                                               |              |                                            |
| 009 | As a student, I can get an overview of the whole program marking my progress by visualising passed and open classes such that I can plan my further studies.                                         |              |                                            |
| 010 | As an Administrator or Quality manager, I can print out or store the module handbook for the complete program (e.g. as PDF).                                                                         |              |                                            |
| 010 | As a (Quality /Faculty  / Program / Module) manager I want to be sure that only authorised persons can edit and change the module and program descriptions.                                          |              |                                            |
| 011 | As a (Quality /Faculty  / Program / Module) manager I want to be able to see which changes have been made by whom in the module database.                                                            |              |                                            |
| 012 | As an Administrator, I can add or approve new users to the module database.                                                                                                                          |              |                                            |
| 013 | As an Administrator, I can change all roles of all users in the module database.                                                                                                                     |              |                                            |
|     |                                                                                                                                                                                                      |              |                                            |
## Roles in the App

Administrator
Quality manager
Faculty manager
Program manager
Module manager
Teacher
Reader
