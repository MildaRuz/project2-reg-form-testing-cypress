describe('Form display testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5177');
  });

  it('form should be visible', () => {
    cy.get('.registration-form').should('be.visible');
  });

  it('should have a label with text "Username" and an associated empty input field with id "username"', () => {
    cy.contains('label', 'Username:')
      .should('exist')
      .then((label) => {
        cy.wrap(label).next('input[id=username]').should('exist').and('have.value', '');
      });
  });

  it('should have a label with text "Email" and an associated empty input field with id "email"', () => {
    cy.contains('label', 'Email:')
      .should('exist')
      .then((label) => {
        cy.wrap(label).next('input[id=email]').should('exist').and('have.value', '');
      });
  });

  it('should have a label with text "Password" and an associated empty input field with id "password"', () => {
    cy.contains('label', 'Password:')
      .should('exist')
      .then((label) => {
        cy.wrap(label).next('input[id=password]').should('exist').and('have.value', '');
      });
  });

  it('should have a label with text "Date of Birth" and an associated empty input field with id "dob"', () => {
    cy.contains('label', 'Date of Birth:')
      .should('exist')
      .then((label) => {
        cy.wrap(label).next('input[id=dob]').should('exist').and('have.value', '');
      });
  });

  it('should display button "Submit"', () => {
    cy.contains('button', 'Submit').should('be.visible');
  });
});

describe('Form functionality testing', () => {
  it('User is able to fill the registration form', () => {
    cy.visit('http://localhost:5177');
    cy.get('#username').type('Jakefake');
    cy.get('#email').type('jfake@bit.lt');
    cy.get('#password').type('secret');
    cy.get('#dob').type('2000-01-02');

    cy.contains('button', 'Submit').click();
    cy.get('.submitted-info').should('be.visible');
  });
});
