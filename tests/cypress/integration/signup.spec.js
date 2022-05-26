/// <reference types = "Cypress" />

import signup from '../support/pages/signup'

describe('SignUp', () => {
  it('deve cadastrar um usuáro', () => {
    const user = {
      name: "Lennon Araujo",
      email: "lennon@sbs.com",
      password: "pwd123"
    }

    cy.task('removeUser', user.email).then(result => {
      console.log(result)
    })

    signup.go()
    signup.form(user)
    signup.submit()

    // Outra possibilidade de driblar o test
    // cy.intercept('POST', '/users', {
    //   statusCode: 200
    // }).as('postUser')

    // cy.wait('@postUser')

    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

  })

  it('deve apresentar mensagem de erro - usuário já cadastrado', () => {

    const user = {
      name: "Usuario teste",
      email: "userteste@sbs.com",
      password: "pwd123",
      is_provider: true
    }

    cy.task('removeUser', user.email).then(result => {
      console.log(result)
    })

    cy.request(
      'POST',
      'http://localhost:3333/users',
      user
    ).then(response => {
      expect(response.status).to.be.equal(200)
    })

    signup.go()
    signup.form(user)
    signup.submit()

    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', 'Email já cadastrado para outro usuário.')
  })
})
