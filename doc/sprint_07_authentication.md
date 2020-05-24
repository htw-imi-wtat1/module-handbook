# Sprint 07 - Authenticating User Accounts

* add user/login view
* npm install passport express-session cookie-parser passport-local-mongoose
* use and initialize passport in app.js - also compare with the
  [Passport Doc](http://www.passportjs.org/docs/)
* Cookies are set via express response directly: https://expressjs.com/de/api.html#res.cookie

## The Session Secret

* the example app uses a simple session secret that is
  hard-coded in the source code. Especially if you publish the
  source code on a public GitHub repository, that should never
  be done in production! To establish a secret session key to
  encrypt the cookies with, use an environment variable with a
  default for development as with the db connection string:

    heroku config:set SESSION_SECRET=<your-session-key>

e.g.

    heroku config:set SESSION_SECRET=uF9KU7auHqHZbimWs_5sSqLTLXnUoFSZ

* search for SESSION_SECRET in app.js to see how to use it.

to generate a good session secret, see [https://github.com/htw-imi-wtat1/miscellany-node-things/blob/master/01_keygenerator/keygenerator.test.js](https://github.com/htw-imi-wtat1/miscellany-node-things/blob/master/01_keygenerator/keygenerator.test.js)

## Flash Messages

Some requests are redirected to show the currect urls in the browser - 
eg. a post users triggers the creating of a new user and after 
that the browser is redirected to get user/:id rather than just
render the user/show view, because this would still show the 
first url of the create action.

Flash messages are added to the response, but need to end up in the response
of the next request in case of redirection. 

## Validation

The example app in the book uses express-validator 5.3.1, the current
version is 6.4. and it's api has significantly changed.
* [https://express-validator.github.io/](https://express-validator.github.io/)
* a list of checks can be found in the validator.js doc:
  [https://github.com/validatorjs/validator.js#validators](https://github.com/validatorjs/validator.js#validators)
 
## Extras

* Include Helmet: [https://helmetjs.github.io/](https://helmetjs.github.io/)

* Cookie Banner and Data Privacy Policy
    * many HTW-Sites just link the HTW Berlin Datenschutzerklärung: [https://www.htw-berlin.de/datenschutz/](https://www.htw-berlin.de/datenschutz/)
      / English:[https://www.htw-berlin.de/en/data-privacy-policy/](https://www.htw-berlin.de/en/data-privacy-policy/)
    * added Cookie Banner with Bootstrap modal: https://getbootstrap.com/docs/4.5/components/modal/
    * I used this page to generate the privacy policy: 
     https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html#englische-version-ihrer-muster-datenschutzerklaerung
    * alternative with more information: https://www.e-recht24.de/artikel/datenschutz/10718-dsgvo-datenschutzerklaerung-generator.html
    * I came to the unclusion that it is ok to store a cookie to record wether ok was clicked, see [Examptions to the consent requirement](https://www.iubenda.com/en/help/5525-cookies-gdpr-requirements#exemptions)