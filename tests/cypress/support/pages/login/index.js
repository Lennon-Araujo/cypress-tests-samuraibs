import toast from "../../components/toast"

class Login {

  constructor() {
    this.toast = toast;
  }

  go() {
    cy.visit('/')
  }

  form(user) {
    cy.get('input[placeholder$="email"]').type(user.email)
    cy.get('input[placeholder*="senha"]').type(user.password)
  }

  submit() {
    cy.contains('button', 'Entrar').click()
  }

  alertHaveText(expectedText) {
    cy.contains('.alert-error', expectedText)
      .should('be.visible')
  }
}
export default new Login()