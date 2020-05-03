# Example for Getting Programming with Node Sprints 02 - 04

* for [WTAT1 SoSe 20](https://bkleinen.github.io/classes/ss2020/wtat1/topics/topic-04-first-express-app/)
* see backlog below

## Usage

* start with

    * production: node main.js
    * development: nodemon main.js  

    # Sprint 04: Deployment

    ## Linting with eslint

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

## Debugger/Logger

### Logging
    export DEBUG=*
    node main.js

### oder über morgan

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
mongoimport (not in the book).

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

( in the mongo container:)

    mongoimport --uri "mongodb://localhost:27017/modulehandbook_db" --collection=courses data/seed/tryout
    mongoexport --uri "mongodb://localhost:27017/modulehandbook_db" --collection=courses  > data/seed/export    

## Documentation
- Mongoose: https://mongoosejs.com/
- Mongoose getting started: https://mongoosejs.com/docs/index.html
- Schematypes: https://mongoosejs.com/docs/schematypes.html


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
