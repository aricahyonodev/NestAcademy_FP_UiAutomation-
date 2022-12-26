import * as route from "@helper/route";
import * as element from "@helper/element";
import { ROUTES } from "@tests/const/routes";
import * as loginPage from "@tests/page/login.page";
import * as managerLoginPage from "@tests/page/bank-manager-login.page";
import * as customersPage from "@tests/page/customers.page";

describe("Open Account Page", () => {
   beforeEach(() => {
     route.visit(ROUTES.login);
      element.click(loginPage.managerLoginButton);
      element.click(managerLoginPage.customersButton);
   });

  describe('Negative Case', () => { 
    it("Search with data not registered", () => {
      const elmSearchCustomers = customersPage.searchField;
      element.fillfield(elmSearchCustomers, "wrong data wrong data wrong data");
      
      cy.get("tr").should(($p) => {
        // should have found 1 elements
        expect($p).to.have.length(1);
      });
    });
   })
});
