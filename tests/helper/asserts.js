export function shouldContainText(selector, ...args) {
  return cy.get(selector).should("contain", ...args);
}

export function shouldHaveValue(selector, ...args) {
  return cy.get(selector).should("have.value", ...args);
}

export function shouldHaveText(selector, ...args) {
  return cy.get(selector).should("have.text", ...args);
}
export function shouldNotHaveText(selector, ...args) {
  return cy.get(selector).should("not.have.text", ...args);
}

export function shouldUrlEqual(...args) {
  return cy.url().should("eq", ...args);
}

export function shouldUrlInclude(...args) {
  return cy.url().should("include", ...args);
}

export function shouldTitleContain(...args) {
  return cy.title().should("contain", ...args);
}
