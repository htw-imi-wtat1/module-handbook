# Sprint 08 - Building an API & Authorization

As an example for the api and authorization within the api I implement 2 simple stories:

- S081 - As a Student, I can export a list of all courses as JSON. (this is open to the public)
- S082 - As a user, I can export a list of all users (not open to the public, requires logged-in user)

The book does not say much about authorization, but there is 
an example how to use the logged in user to filter the result on page 343.
       
### S081 - As a Student, I can export a list of all courses as JSON.

- create test case: [test/api/courseIndex.test.js](../test/api/courseIndex.test.js)   
- create [app/routes/apiRoutes.js](../app/routes/apiRoutes.js)
- create [app/controllers/apiController.js](../app/controllers/apiController.js)
- use apiRoutes in [app/routes/index.js](../app/routes/index.js)


### S082 - As a user, I can export a list of all users (not open to the public, requires logged-in user)
#### Step 1: without authorization:
- create test case: [test/api/userIndex.test.js](../test/api/userIndex.test.js)
- define api route /api/users: [app/routes/apiRoutes.js](../app/routes/apiRoutes.js)

#### JWT Authentication

- npm install jsonwebtoken
- add apiAuthenticate and verifyJWT to [usersController](../app/controllers/usersController.js): 
- add api/login route to [apiRoutes](../app/routes/apiRoutes.js)
- test with 

    curl -d "email=barne@infrastructure.de&password=geheim12" http://localhost:3000/api/login
    curl -H "token: <copy token here>" http://localhost:3000/api/users

- modified test in [test/api/userIndex.test.js](../test/api/userIndex.test.js) to work with jwt 

#### Testing with Authentication

see [authentication_authorization](./authentication_authorization.md)

