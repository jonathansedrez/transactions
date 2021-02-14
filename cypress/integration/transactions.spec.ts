import { mock } from '../../src/api/test/transactions.mock';

beforeEach(() => {
  cy.visit('http://localhost:3000');
  cy.intercept('*/transactions', mock).as('transactions');
});

describe('Transaction Screen', () => {
  it('Should list transactions', () => {
    cy.wait('@transactions').its('response.body').should('have.length', 3);
  });

  it('Should open transaction details', () => {
    cy.get(
      ':nth-child(2) > table > [data-testid=agregated-list-transaction] > :nth-child(1) > :nth-child(1)'
    ).click();
    cy.getBy('modal-card').should('be.visible');
    cy.getBy('modal-close-icon').click();
  });

  it(`Should type on filter and show only "Depósito" titles`, () => {
    cy.getBy('filter-input').type('Depósito');
    cy.get('.agregated-list-transaction > :nth-child(1) > p').should(
      'to.be',
      'Depósito'
    );
  });

  it(`Should select only precessing status on filter`, () => {
    cy.getBy('filter-button-icon').click();
    cy.getBy('dropdown').click();
    cy.get('.dropdown-list > :nth-child(4)').click();
    cy.get('.agregated-list-transaction > :nth-child(1) > p').should(
      'to.be',
      'Resgate'
    );
  });

  it('Should show empty state when filter not match', () => {
    cy.getBy('filter-input').type('invalid filter text');
    cy.getBy('empty-state').should('be.visible');
  });
});
