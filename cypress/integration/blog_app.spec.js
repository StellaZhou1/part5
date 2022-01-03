describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.createUser({ username: 'stella', name: 'stella',password: '12345' })
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.login({ username: 'stella', password: '12345' })
          cy.get('.logged-in').should('contain', 'logged in') 
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('stella')
            cy.get('#password').type('1234')
            cy.get('#login-button').click()
        
            cy.contains('Wrong credentials')
          })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'stella', password: '12345' })
        })
    
        it('A blog can be created', function() {
          cy.get('#show-blogform-button').click()
          cy.get('#author').type('Alice')
          cy.get('#title').type('How to make delicous food')
          cy.get('#url').type('www.alice.com')
          cy.get('#create-button').click()
          cy.contains(`A new blog How to make delicous food by Alice added`)
          cy.get('#blogs-list').should('contain', 'Alice') 
        })

        it('User can like a blog', function() {
            cy.get('#show-blogform-button').click()
            cy.get('#author').type('Alice')
            cy.get('#title').type('How to make delicous food')
            cy.get('#url').type('www.alice.com')
            cy.get('#create-button').click()
            cy.get('#view-button').click()
            cy.get('#like').click()            
            cy.contains('1')
        })

        it('Creator can delete a blog', function() {
            cy.get('#show-blogform-button').click()
            cy.get('#author').type('Alice')
            cy.get('#title').type('How to make delicous food')
            cy.get('#url').type('www.alice.com')
            cy.get('#create-button').click()
            cy.get('#view-button').click()
            cy.get('#remove-button').click()            
            cy.get('#blogs-list').should('be.empty')
        })
    })

  })