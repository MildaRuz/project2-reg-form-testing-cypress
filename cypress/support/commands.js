Cypress.Commands.add('fillAndSubmitForm', (username = '', email = '', password = '', dob = '') => {
  cy.visit('http://localhost:5177/');

  if (username) {
    cy.get('#username').type(username);
  }

  if (email) {
    cy.get('#email').type(email);
  }

  if (password) {
    cy.get('#password').type(password);
  }

  if (dob) {
    cy.get('#dob').type(dob);
  }

  // Use cy.contains to select the button by its text
  cy.contains('button', 'Submit').click();
});
