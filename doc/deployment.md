# CI/CD to Heroku from a GitHub Workflow

* setup ci workflow in github actions on github page
* if in-memory db is used for tests, this should run out of the box
* set up automatic deployment: deploy every push on master where ci ran successfully:
https://devcenter.heroku.com/articles/github-integration#enabling-github-integration


## Links to Application Dashboard (need login to heroku):
* [Heroku Dashboard](https://dashboard.heroku.com/apps/wtat1-module-handbook)
* [Heroku Activity](https://dashboard.heroku.com/apps/wtat1-module-handbook/activity)


## Docker

(This is not part of any sprint, you don't have to implement this.)

The Module Handbook can run in docker containers, see the docker-compose.yml and
Dockerfile here in the  example application. 
It is also possible to just run mongo in docker: 

    docker-compose start mongodb

