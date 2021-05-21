describe('Application', () => {
  it('renders welcome message', () => {
    cy.visit('/');
    cy.contains('to-do list').should('be.visible');
  });
});
