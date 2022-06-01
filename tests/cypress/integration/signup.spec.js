/// <reference types = "Cypress" />

import signup from '../support/pages/signup'

describe('SignUp', () => {
  context('deve cadastrar um usuários', function() {
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

      signup.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
  
    })
  })

  context('deve apresentar mensagem de erro - usuário já cadastrado', function() {
    const user = {
      name: "Usuario teste",
      email: "userteste@sbs.com",
      password: "pwd123",
      is_provider: true
    }

    before(function() {
      cy.postUser(user)
    })

    it('deve apresentar mensagem de erro - usuário já cadastrado', () => {

      signup.go()
      signup.form(user)
      signup.submit()
      signup.toast.shouldHaveText('Email já cadastrado para outro usuário.')
    })
  })

  context('deve verificar senhas pequenas', function() {
    let passwords = ['1', 'ab', 'abc', 'ab12', 'ab#12']
    beforeEach(function () {
      signup.go()
    })

    passwords.forEach(function(p) {
      it(`deve informar  que a senha ${p} é inválida`, function() {
        const user = {
          name: "Usuario teste",
          email: "userteste@sbs.com",
          password: p
        }

        signup.form(user)
        signup.submit()
        signup.alertHaveText('Pelo menos 6 caracteres')
      })
    })
  })

  context('deve verificar alertas com formulário em branco', function() {
    let alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(function() {
      signup.go()
      signup.submit()
    })

    alertMessages.forEach(function(alert) {
      it(`deve mostrar mensagem ${alert}`, function() {
        signup.alertHaveText(alert)
      })
    })
  })
})
