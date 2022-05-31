class Toast {
  shouldHaveText(expectText) {
    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', expectText)
  }
}

export default new Toast()