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

