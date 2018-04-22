/* global then */
then('heading-1 has the color {string}', (color) => {
  cy.get('.primary-heading').should('css', 'color', color);
});
