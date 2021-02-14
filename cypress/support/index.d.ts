// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  export interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getBy('greeting')
     */
    getBy(value: string, args?: any): Chainable<Element>;
  }
}
