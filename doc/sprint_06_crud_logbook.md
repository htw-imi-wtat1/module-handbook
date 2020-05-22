# Sprint 06 - CRUD for a new Model

## Stories:

061 As a Student, I see a LogBook of my studies consisting of LogBookEntries
 describing important events like planned, enrolled and passed in regards to courses.
 LogBook Show)

062 As a Student, I can create, edit, update and delete Entries in my Logbook.

## A Note on Data Modeling

Data Model for the LogBooks: each User(Student) has exactly one LogBook,
and a LogBook consists of many LogEntries.

Coming from Modeling Data for a RDBMS system, you may be tempted to 
normalize your data, create a Table for each of the three - User, 
LogBook and LogEntry and use associations to put them back together.

Mongo as a Document-Based data store is organized around Documents,
which may have nested subdocuments.

Have a look at [the Data Model Design](https://docs.mongodb.com/manual/core/data-model-design/)
page in the Mongo Documentation, to decide wether you should use an embedded model or a normalized data model for
a specific case.

For the Student's Study LogBook I chose the embeded model, as LogEntries only 
exist in their LogBook and a LogBook does only exist in the context of a User/Student.

If the application happens to be extended to accomodate more than one Study Program,
Programs would be a separate Entity as Programs and Courses(Modules) exist
independently from each other.

Note that if you work with embedded models/resources, this should be 
reflected in the structure of your routes.
See 

## Implementation

Tasks: 
Creating and Showing a logbook.

- added LogBook and LogEntry Subdocuments to the User Schema, see [Mongoose Doc: Subdocuments](https://mongoosejs.com/docs/subdocs.html)
- added Button "Create LogBook/Show LogBook in user#show."

## Mongoose-repl

     mongoose localhost/modulehandbook_db