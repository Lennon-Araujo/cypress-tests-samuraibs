import toast from '../../components/toast'
import alert from '../../components/alert';
class RecoveryPass {

  constructor() {
    this.toast = toast;
    this.alert = alert;
  }

  go() {
    cy.visit('/forgot-password')
  }

  form(email) {
    cy.get('input[placeholder$=mail]').type(email)
  }

  submit() {
    cy.contains('button', 'Recuperar').click()
  }
  
}
export default new RecoveryPass()