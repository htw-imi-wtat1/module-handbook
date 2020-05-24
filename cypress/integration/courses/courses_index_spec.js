describe('courses#index', () => {
  it('shows the courses', () => {
    cy.request('http://localhost:3002/cookieBanner/OK')
    cy.visit('http://localhost:3002/courses')
    cy.contains('Courses')
    cy.contains('Create new Course').click()
  })
})
