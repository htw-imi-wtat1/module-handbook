# Authentication and Authorisation

# Authentication

Used Packages:

- Passport
- [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)
- Blog post with an example for passport-local-mongoose: [https://mherman.org/blog/user-authentication-with-passport-dot-js/](https://mherman.org/blog/user-authentication-with-passport-dot-js/)


# Authorisation


## Playground and Tests


### Logging in in Jest Tests

Supertest does save cookies - see [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)
However, Passport does not seem to have functionality supporting tests.
Thus, I've introduced a proxy for the authentication that can easily be altered for the tests.

See: 
- [app/proxies/authenticationProxy.js](../app/proxies/authenticationProxy.js)

