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
    const username = 'Jakefake';
    const email = 'jfake@bit.lt';
    const password = 'secret';
    const dob = '2000-01-02';

    cy.visit('http://localhost:5177');
    cy.get('#username').type(username);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#dob').type(dob);

    cy.contains('button', 'Submit').click();

    cy.get('.error').should('not.exist');

    // Calculate the expected age
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Verify that the submitted info is visible and contains the correct data
    cy.get('.submitted-info').should('be.visible');

    cy.get('.submitted-info p').then((elements) => {
      const texts = [`Username: ${username}`, `Email: ${email}`, `Date of Birth: ${dob}`, `Age: ${age}`];

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
    cy.get('#username').type('Jakefake');
    cy.get('#email').type('invalid@email');
    cy.get('#password').type('secret');
    cy.get('#dob').type('2000-01-02');

    cy.contains('button', 'Submit').click();
    cy.get('.error').should('be.visible').and('contain', 'Email is invalid');
  });

  it('Displays a validation message for a password that is too short', () => {
    cy.get('#username').type('Jakefake');
    cy.get('#email').type('jfake@bit.lt');
    cy.get('#password').type('123');
    cy.get('#dob').type('2000-01-02');

    cy.contains('button', 'Submit').click();
    cy.get('.error').should('be.visible').and('contain', 'Password must be at least 6 characters');
  });
});
