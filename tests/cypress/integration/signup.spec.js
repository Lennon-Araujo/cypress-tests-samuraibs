/// <reference types = "Cypress" />

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

    cy.visit('/signup')

    cy.get('input[placeholder="Nome"]').type(user.name)
    cy.get('input[placeholder="E-mail"]').type(user.email)
    cy.get('input[placeholder="Senha"]').type(user.password)

    // cy.intercept('POST', '/users', {
    //   statusCode: 200
    // }).as('postUser')

    cy.contains('button', 'Cadastrar').click()

    // cy.wait('@postUser')

    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

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

    cy.visit('/signup')

    cy.get('input[placeholder="Nome"]').type(user.name)
    cy.get('input[placeholder="E-mail"]').type(user.email)
    cy.get('input[placeholder="Senha"]').type(user.password)

    cy.contains('button', 'Cadastrar').click()

    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', 'Email já cadastrado para outro usuário.')
  })
})
