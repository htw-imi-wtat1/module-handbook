# Authentication and Authorisation

# Authentication

Used Packages:

- Passport
- [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)
- Blog post with an example for passport-local-mongoose: [https://mherman.org/blog/user-authentication-with-passport-dot-js/](https://mherman.org/blog/user-authentication-with-passport-dot-js/)

# Authorisation

The book does not contain much information about Authorisation - determining if a user is allowed to do specific actions in the app.
The basic approach is to check for a logged in user in the controller.
The JWT Part contains an example of a middleware that can be
put before all routes that require a logged-in user 
(see verifyJWT in [apiRoutes](../app/routes/apiRoutes.js) and
 [usersController](../app/controllers/usersController.js) ).

If you ever need to or want to implement more sophisticated access rules,
it is probably best to look at a library for that - 
e.g. [CASL](https://casl.js.org/v4/en/) which makes it possible to 
define access rights - abilities - in one central place in the app.

## Playground and Tests

To ease testing of authentication, I've created 
an "Authorization Playground" ([controller](../app/controllers/authorizationPlaygroundController.js),
[routes](../app/routes/authorizationPlaygroundRoutes.js))
it's available in the example app: 
[https://module-handbook.herokuapp.com/authorizationPlayground](https://module-handbook.herokuapp.com/authorizationPlayground)

## Authentication (login) in Jest Tests

Using Jest for Integration and System tests is mainly undocumented.
I've created examples for two major approaches for testing routes that 
need authentication/authorization: 

a. ensuring persistent sessions in the tests and logging into that session

b. encapsulating the authentication interface via a proxy and have the tests provide
their own implementation. 

I've created [helper methods](../test/helper/loginPassport.js) 
and an [example how to use them](../test/authorization/howToAuthenticateInTestsPassportHelper.test.js).

### a. Using persistent sessions for login in Jest/Superagent

Supertest, or better Superagent does save cookies if the requests are sent via 
Superagent's Agent rather than supertest(app)- see [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)
and the example in [howToAuthenticateInTestsPassport](../test/authorization/howToAuthenticateInTestsPassport.test.js)

    const agent = request.agent(app)

Note that for this to work, users need to be registered via the **User.register** method provided by 
passport rather than just saved in the database. (Exploration of this can be found in 
[authenticationWithPassport](../test/exploreAPIs/passport/authenticationWithPassport.test.js))


### b. Exchanging the Authentication Implementation via a Proxy

#### tl;dr (see how to use it below)
Another way to test functionality that requires authorization (or to test that certain functionality  
is not accessible when not authorized, e.g. deleting something) is to replace the authentication implementation
with a stub for testing. 
([See Martin Fowlers Article on the Differentation and Pro and Cons of Stubs and Mocks](https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs)) 

To enable this, I've created an Authentication Proxy (it is not strictly a Proxy in the sense of the 
Design Pattern - see e.g. [here](https://www.oodesign.com/proxy-pattern.html) as I changed the Interface)
that, if used in the application rather than directly accessing req.user and req.isAuthenticated 
provided by passport.js, can easily be exchanged

Jonathan Wexler actually already had the interface replaced with moving the loggedIn Flag and the 
reference to the currentUser from req to res.locals and using them in his controllers.
By defining it as functions on the request prototype rather than values on each response
they can be replaced globally on the app = express() object.

However, Passport does not seem to have functionality supporting tests.
Thus, I've introduced a proxy for the authentication that can easily be 
altered for the tests.

See: 
- [app/proxies/authenticationProxy.js](../app/proxies/authenticationProxy.js)
- [howToAuthenticateInTestsProxy.test.js](../test/authorization/howToAuthenticateInTestsProxy.test.js) for an explicit 
   example how to exchange the implementation in the tests.
   
#### How to use it

See [howToAuthenticateInTestsProxyHelper](test/authorization/howToAuthenticateInTestsProxyHelper.test.js)
how the login logic stubbing the proxy can be encapsulated in an helper. You can just
copy my methods from [loginProxy](../test/helper/loginProxy.js).

#### Advantages

- stubbing the authentication logic enhances isolation of the Subjects under Tests for Unit tests
- can be stubbed with really simple things, even without a database
- suitable for controller unit tests
- use it for component/unit tests

#### Disadvantages
- the test stub may differ from the real implementation which may lead to bugs not caught.
- use passport login for integration and system tests