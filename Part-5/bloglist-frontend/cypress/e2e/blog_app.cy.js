describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Garry Richardson',
      username: 'Garry',
      password: 'qwerty'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Garry')
      cy.get('#password').type('qwerty')
      cy.get('#login-button').click()

      cy.contains('Garry Richardson logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('George')
      cy.get('#password').type('qwerty')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Garry Richardson logged-in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Garry', password: 'qwerty' })
    })

    it('a new blog can be created, updated and deleted', function() {
      cy.get('#new-blog').click()

      cy.createBlog({
        title: 'Hello',
        author: 'That is me',
        url: 'www.new.comer'
      })

      cy.contains('Hello by That is me')

      cy.reload()
      cy.get('#view').click()
      cy.get('#new-likes-amount').type('9')
      cy.get('#update-likes').click()
      cy.contains('9')

      cy.get('#delete').click()
      cy.get('html').should('not.contain', 'Hello')
    })

    it('the blogs are ordered according to likes with the blog with the most likes being first', function() {
      cy.createBlog({
        title: 'Hello again',
        author: 'Jessica',
        url: 'www.new.com'
      })
      cy.createBlog({
        title: 'Lets read',
        author: 'Herbert',
        url: 'www.new.net'
      })
      cy.createBlog({
        title: 'Non stop',
        author: 'Garvard',
        url: 'www.new.fi'
      })

      cy.reload()
      cy.get('#view').click()
      cy.get('#new-likes-amount').type('1')
      cy.contains('www.new.fi').parent().find('#update-likes').click()
      cy.get('#new-likes-amount').type('5')
      cy.contains('www.new.com').parent().find('#update-likes').click()
      cy.get('#new-likes-amount').type('9')
      cy.contains('www.new.net').parent().find('#update-likes').click()
      cy.get('.blog').eq(0).should('contain', '9')
      cy.get('.blog').eq(1).should('contain', '5')
      cy.get('.blog').eq(2).should('contain', '1')
    })
  })

})