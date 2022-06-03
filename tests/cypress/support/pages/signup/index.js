import toast from '../../components/toast'
import alert from '../../components/alert';
class SignUp {

  constructor() {
    this.toast = toast;
    this.alert = alert;
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
  
}
export default new SignUp()