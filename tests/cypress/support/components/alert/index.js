class Alert {
  haveText(expectedText) {
    cy.contains('.alert-error', expectedText)
      .should('be.visible')
  }
}

export default new Alert()