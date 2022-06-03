class Header {
  userLoggedIn(user) {
    cy.get('header a strong', { timeout: 7000 })
      .should('be.visible')
      .and('have.text', user.name)
  }
}

export default new Header()