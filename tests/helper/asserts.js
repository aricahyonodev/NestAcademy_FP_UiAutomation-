export function shouldContainText(selector, ...args) {
  return cy.get(selector).should("contain", ...args);
}

export function shouldUrlEqual(...args) {
  return cy.url().should("eq", ...args);
}
