# Example for Getting Programming with Node

* for [WTAT1 SoSe 20](https://bkleinen.github.io/classes/ss2020/wtat1/topics/topic-04-first-express-app/)
* see backlog below
* App on Heroku: https://wtat1-module-handbook.herokuapp.com/

__Documentation for the individual Sprints can be found in the [doc/](doc/) folder__
 
 ![Node.js CI](https://github.com/htw-imi-wtat1/module-handbook/workflows/Node.js%20CI/badge.svg)
 ![End-to-end tests](https://github.com/htw-imi-wtat1/module-handbook/workflows/End-to-end%20tests/badge.svg?branch=master)

## Usage

local start: 


    npm run mongo
    npm run start

For starting the server locally.


    "start": "node main.js",
    "start dev": "nodemon main.js",
    "mongo": "docker-compose up -d mongo",
    "mongobash": "docker-compose exec mongo bash",
    "test": "jest;cypress run",

see [package.json](./package.json) for all scripts.

  

