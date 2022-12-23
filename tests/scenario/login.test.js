import * as assert from "@helper/asserts";
import * as route from "@helper/route";
import * as element from "@helper/element";
import { ROUTES } from "@tests/const/routes";
import * as loginPage from "@tests/page/login.page";

describe("Verify Login Page", () => {
  beforeEach(() => {
    route.visit(ROUTES.login);
  });

  describe("Verify page title", () => {
    it("displays the correct web title", () => {
      assert.shouldTitleContain("XYZ Bank");
    });

    it("displays the correct top navigation title", () => {
      assert.shouldHaveText(loginPage.topNavigationTitle, "XYZ Bank");
    });
  });

  describe('Test "Customer Login" button', () => {
    it("is present on the page", () => {
      assert
        .shouldContainText(loginPage.customerLoginButton, "Customer Login")
        .should("be.visible");
    });

    it("redirects to the correct page when clicked", () => {
      element.click(loginPage.customerLoginButton);
      assert.shouldUrlInclude("/customer");
    });
  });

  describe.skip('Test "Manager Login" button', () => {
    it("is present on the page", () => {});

    it("redirects to the correct page when clicked", () => {});
  });
});
