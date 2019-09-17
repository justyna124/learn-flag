/// <reference types="Cypress" />

context('generate-math-tasks', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/task-generate')
  });

  it('type into a DOM element and elasticsearch store', () => {
    cy.get('.task_content')
      .type('Tomek ma :p kredek, Ala ma :i kredek, Jaś ma :r kredek. Ile mają razem?');
    cy.get('.task-tags').type('dziecko{enter}proste{enter}');
    cy.get('.task_variable').type(':p > 0 && :i > 0 && :r > 0 && :p < 10 && :i < 15 && :r < 20');
    cy.get('.task_condition').type(':p + :i + :r');
    cy.get('.task_button_store').click();
    cy.wait(1000);
    cy.get('.boxSuccess .success').should('have.text', ' Zapis danych w bazie danych przebiegł pomyślnie. ');
  })
});
