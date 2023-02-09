import PostForm from "./PostForm"

describe('handleSubmit', () => {
    it('should create a post and set the auth token', () => {
      const token = window.localStorage.getItem('token')
      const newPost = 'My new post'
  
      // Mock server response
      cy.server()
      cy.route({
        method: 'POST',
        url: '/posts',
        response: { token }
      })
  
      // Call handleSubmit
      cy.window().invoke('handleSubmit', { message: newPost }) 
  
      // Assert results were as expected
      cy.window().its('localStorage.token').should('equal', token)
      cy.get('@logs').should('contain', 'post was created')
    })
  
    it('should log error when post was not created', () => {
      const token = window.localStorage.getItem('token')
      const newPost = 'My new post'
  
      // Mock server response
      cy.server()
      cy.route({
        method: 'POST',
        url: '/posts',
        status: 500
      })
  
      // Call handleSubmit
      cy.window().invoke('handleSubmit', { message: newPost }) 
  
      // Assert results were as expected
      cy.window().its('localStorage.token').should('equal', token)
      cy.get('@logs').should('contain', 'post was not created')
    })
  })
  