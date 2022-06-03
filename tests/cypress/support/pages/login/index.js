import toast from "../../components/toast"
import alert from "../../components/alert";

class Login {

  constructor() {
    this.toast = toast;
    this.alert = alert;
  }

  go() {
    cy.visit('/')
  }

  form(user) {
    cy.get('input[placeholder$="email"]')
      .clear()
      .type(user.email)
    cy.get('input[placeholder*="senha"]')
      .clear()
      .type(user.password)
  }

  submit() {
    cy.contains('button', 'Entrar').click()
  }

}
export default new Login()