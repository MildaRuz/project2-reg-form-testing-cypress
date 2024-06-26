/* eslint-disable no-undef */
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
    // Define the user input data
    const correctUsername = 'Jakefake';
    const correctEmail = 'jfake@bit.lt';
    const correctPassword = 'secret';
    const correctDob = '2000-01-02';

    const expectedAge = '24';

    cy.visit('http://localhost:5177');

    cy.fillAndSubmitForm(correctUsername, correctEmail, correctPassword, correctDob);

    cy.contains('button', 'Submit').click();

    cy.get('.error').should('not.exist');

    // Verify that the submitted info is visible and contains the correct data
    cy.get('.submitted-info').should('be.visible');

    cy.get('.submitted-info p').then((elements) => {
      const texts = [
        `Username: ${correctUsername}`,
        `Email: ${correctEmail}`,
        `Date of Birth: ${correctDob}`,
        `Age: ${expectedAge}`,
      ];

      texts.forEach((text) => {
        cy.wrap(elements).contains(text);
      });
    });
  });
});

describe('Form validation for empty or invalid data testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5177');
  });

  const correctUsername = 'Jakefake';
  const correctEmail = 'jfake@bit.lt';
  const correctPassword = 'secret';
  const correctDob = '2000-01-02';

  it('Displays validation messages for empty required fields', () => {
    cy.contains('button', 'Submit').click();
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Username is required')
      .and('contain', 'Email is required')
      .and('contain', 'Password is required')
      .and('contain', 'Date of Birth is required');
  });

  it('Displays a validation message for an invalid email', () => {
    cy.fillAndSubmitForm(correctUsername, 'invalid@email', correctPassword, correctDob);

    cy.get('.error').should('be.visible').and('contain', 'Email is invalid');
  });

  it('Displays a validation message for a password that is too short', () => {
    const shortPassword = '123';

    cy.fillAndSubmitForm(correctUsername, correctEmail, shortPassword, correctDob);

    cy.get('.error').should('be.visible').and('contain', 'Password must be at least 6 characters');
  });
});
