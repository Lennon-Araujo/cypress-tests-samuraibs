import toast from '../../components/toast'
class SignUp {

  constructor() {
    this.toast = toast
  }

  go() {
    cy.visit('/signup')
  }

  form(user) {
    cy.get('input[placeholder^="Nome"]').type(user.name)
    cy.get('input[placeholder$="email"]').type(user.email)
    cy.get('input[placeholder*="senha"]').type(user.password)
  }

  submit() {
    cy.contains('button', 'Cadastrar').click()
  }

  alertHaveText(expectedText) {
    cy.contains('.alert-error', expectedText)
      .should('be.visible')
  }
}
export default new SignUp()