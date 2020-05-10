# Sprint 05 - CRUD, Validation and Model Associations

## User CRUD

- copied the relevant files from the book source code examples. You can just use the files
  in doc/user_crud and copy them into your application. add_to_main.md lists the changes 
  that needed to be done in other places.
- created tests and seeds for user. seeds were done with faker:


    npm install faker --save-dev
    
- created snapshot test for user/index
- created controller tests for user/edit, user/delete and user/update

## Testing

- created controller tests for the different actions. 
- created controller tests

### New in-memory db

    npm install mongodb-memory-server --save-dev
    
    https://github.com/nodkz/mongodb-memory-server

### Links
* https://github.com/visionmedia/supertest
* https://visionmedia.github.io/superagent/

