import toast from '../../components/toast'
import alert from '../../components/alert';
class ResetPass {

  constructor() {
    this.toast = toast;
    this.alert = alert;
  }

  go(token) {
    cy.visit(`/reset-password?token=${token}`)
  }

  form(password, confirmPassword) {
    cy.get('input[placeholder="Nova senha"]').type(password)
    cy.get('input[placeholder="Confirmação da senha"]').type(confirmPassword)
  }

  submit() {
    cy.contains('button', 'Alterar senha').click()
  }

}
export default new ResetPass()