const { id } = require('../../commonCypress')
const faker = require('faker')
function login () {
  const email = `len_zintl_${id()}@hotmail.com`
  const firstName = 'Cypress'
  cy.request('http://localhost:3002/cookieBanner/OK')
  cy.visit('http://localhost:3002/users/new')
  cy.get('#inputFirstName')
    .type(firstName)
    .should('have.value', firstName)
  cy.get('#inputLastName')
    .type('Chatter')
  cy.get('#inputPassword')
    .type('geheim12')
  cy.get('#inputEmail')
    .type(email)
  cy.get('#inputZipCode')
    .type(12321)
  cy.contains('Create a new user:')
  cy.get('#submitButton').click()
  cy.contains(firstName)

  cy.visit('http://localhost:3002/users/login')
  cy.get('#inputPassword')
    .type('geheim12')
  cy.get('#inputEmail')
    .type(email)
  cy.get('#submitButton').click()
  cy.contains('Logged in!')
}

describe('chat', () => {
  before(() => {
    // from https://docs.cypress.io/api/cypress-api/cookies.html#Preserve-Once
    // log in only once before any of the tests run.
    // your app will likely set some sort of session cookie.
    // you'll need to know the name of the cookie(s), which you can find
    // in your Resources -> Cookies panel in the Chrome Dev Tools.
    login()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('connect.sid', 'bannerCookie')
  })

  it('chat', () => {
    cy.visit('http://localhost:3002/chat')
    cy.contains('Chat')

    const message = faker.hacker.phrase()
    cy.get('#chat-input')
      .type(message)
    cy.get('#chat-submit-button').click()
    cy.contains('Cypress Chatter: ' + message)
  })
})
