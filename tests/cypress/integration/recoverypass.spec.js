/// <reference types = "Cypress" />

import recoPassPage from '../support/pages/recoverypass'

describe('Recovery Password', () => {
  context('quando o usuário solicitar a recuperação de senha', function () {
    const user = {
      name: "Everton Ribeiro",
      email: "everton@sbs.com",
      password: "pwd123",
      is_provider: true
    }

    before(function () {
      cy.postUser(user)
    })

    it('deve enviar solicitação de recuperação de senha', () => {
      recoPassPage.go()
      recoPassPage.form(user.email)
      recoPassPage.submit()
      recoPassPage.toast.shouldHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')

    })
  })

  context.only('quando o usuário receber acesso para alterar senha', function () {
    const user = {
      name: "Everton Ribeiro",
      email: "everton@sbs.com",
      password: "pwd123",
      is_provider: true
    }

    before(function () {
      cy.postUser(user)
      cy.recoveryPass(user.email)
    })

    it('deve', () => {
      console.log(Cypress.env('recoveryToken'))
    })
  })
})
