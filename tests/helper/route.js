export const BASE_URL = {
  DASHBOARD: Cypress.env("BASE_URL"),
};

export function visit(routes) {
  cy.visit(BASE_URL.DASHBOARD + routes);
}
