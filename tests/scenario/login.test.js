import * as assert from "@helper/asserts";
import * as element from "@helper/element";
import * as route from "@helper/route";
import { ROUTES } from "@tests/const/routes";
import * as login from "@tests/data/login.data";
import * as loginPage from "@tests/page/login.page";
import * as inventoryPage from "@tests/page/inventory.page";

describe("Login Test", () => {
  beforeEach(() => {
    route.visit(ROUTES.login);
  });

  it("Ensure the error message is displayed when user entered invalid login data", () => {
    element.fillfield(
      loginPage.usernameField,
      login.INVALID_LOGIN_DATA.username
    );
    element.fillfield(
      loginPage.passwordField,
      login.INVALID_LOGIN_DATA.password
    );
    element.click(loginPage.loginButton);
    assert.shouldContainText(
      loginPage.errorMessage,
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Ensure there is Products title when user entered valid login data and successfuly login", () => {
    element.fillfield(loginPage.usernameField, login.VALID_LOGIN_DATA.username);
    element.fillfield(loginPage.passwordField, login.VALID_LOGIN_DATA.password);
    element.click(loginPage.loginButton);
    assert.shouldContainText(inventoryPage.titleText, "Products");
  });

  it("Ensure redirected to inventory url when user entered valid login data and successfuly login", () => {
    element.fillfield(loginPage.usernameField, login.VALID_LOGIN_DATA.username);
    element.fillfield(loginPage.passwordField, login.VALID_LOGIN_DATA.password);
    element.click(loginPage.loginButton);
    assert.shouldUrlEqual("https://www.saucedemo.com/inventory.html");
  });
});
