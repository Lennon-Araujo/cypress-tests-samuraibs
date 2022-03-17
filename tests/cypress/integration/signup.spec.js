/// <reference types = "Cypress" />

it('deve cadastrar um usuáro', () => {
  const name = "Lennon Araujo";
  const email = "lennon@sbs.com";
  const password = "pwd123";

  cy.visit('/signup')

  cy.get('input[placeholder="Nome"]').type(name)
  cy.get('input[placeholder="E-mail"]').type(email)
  cy.get('input[placeholder="Senha"]').type(password)

  cy.contains('button', 'Cadastrar')

})