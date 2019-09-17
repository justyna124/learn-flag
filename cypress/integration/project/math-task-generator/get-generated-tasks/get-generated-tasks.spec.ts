/// <reference types="Cypress" />

context('generate-math-tasks', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/tasks-generated')
  });

  it('elasticsearch get from store, type into a DOM element and generate tasks', () => {
    cy.get('.task-tags').type('proste{enter}');
    cy.wait(1000);
    cy.get('.mat-selection-list-0').click({force: true} );
    cy.get('.task_selected_button_next').click();
    cy.get('.more_than').type('1');
    cy.get('.less_than').type('100');
    cy.get('.task_condition_button_next').click();
    cy.get('.tasks_assertion').click();
    cy.get('.failure').should('not.exist');
    cy.get('.success').should('exist');
  });
});
