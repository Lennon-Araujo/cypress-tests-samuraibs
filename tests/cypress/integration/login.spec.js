/// <reference types = "Cypress" />

import login from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', () => {
  context('deve logar', function () {
    const user = {
      name: "Lennon Araujo",
      email: "lennon@sbs.com",
      password: "pwd123",
      is_provider: true
    }

    before(function () {
      cy.postUser(user)
    })

    it('deve logar na plataforma', () => {
      login.go()
      login.form(user)
      login.submit()

      dashPage.header.userLoggedIn(user)

    })
  })

  context('usuário válido mas senha incorreta', function () {
    let user = {
      name: 'Senha Invalida',
      email: 'senharuim@sbs.com',
      password: 'pwd123',
      is_provider: true
    }

    before(function () {
      cy.postUser(user).then(() => {
        user.password = 'pwd124'
      })
    })

    it('deve notificar erro de credenciais', function () {
      login.go()
      login.form(user)
      login.submit()

      login.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
    })
  })

  context('quando o formato do e-mail é inválido', function () {
    const emails = [
      'teste.com.br',
      'yahoo.com',
      '@gmail.com',
      '@',
      '111',
      'teste@',
      '$&%&$%&&$%&',
      'xpto123'
    ]

    before(function () {
      login.go()
    })

    emails.forEach(function (email) {
      it(`não deve logar com o e-mail: ${email}`, function () {
        const user = { email: email, password: 'pwd123' }

        login.form(user)
        login.submit()
        login.alert.haveText('Informe um email válido')
      })
    })
  })

  context('deve verificar alertas com formulário em branco', function() {
    let alertMessages = [
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(function() {
      login.go()
      login.submit()
    })

    alertMessages.forEach(function(alert) {
      it(`deve mostrar mensagem ${alert}`, function() {
        login.alert.haveText(alert)
      })
    })
  })
})
