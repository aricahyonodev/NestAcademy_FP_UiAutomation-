import * as assert from "@helper/asserts";
import * as route from "@helper/route";
import * as element from "@helper/element";
import * as dtCs from "@tests/data/customer.data";
import { ROUTES } from "@tests/const/routes";
import * as loginPage from "@tests/page/login.page";
import * as managerLoginPage from "@tests/page/bank-manager-login.page";
import * as addAccountPage from "@tests/page/add-account.page";
import * as openAccountPage from "@tests/page/open-account.page";
import * as customersPage from "@tests/page/customers.page";

describe("Delete Account", () => {
  let accountId = null;

  beforeEach(() => {
    route.visit(ROUTES.addCustomers);

    // Input Firstname
    const elmFirstname = addAccountPage.firstnameField;
    const valFirstname = dtCs.CUSTOMER_REGISTERED.firstname;
    element.fillfield(elmFirstname, valFirstname);

    // Input Lastname
    const elmLastname = addAccountPage.lastnameField;
    const valLastname = dtCs.CUSTOMER_REGISTERED.lastname;
    element.fillfield(elmLastname, valLastname);

    // Input Postcode
    const elmPostcode = addAccountPage.postcodeField;
    const valPostcode = dtCs.CUSTOMER_REGISTERED.postCode;
    element.fillfield(elmPostcode, valPostcode);

    element.click(addAccountPage.addCustomersButton);
    cy.on("window:alert", (txt) => {
      const alertMsg = "Customer added successfully with customer id :";
      accountId = txt.replace(alertMsg, "");
    });
    
     element.click(managerLoginPage.homeButton);

     element.click(loginPage.managerLoginButton);
     element.click(managerLoginPage.openAccountButton);

   
  });

  describe("Positive Case", () => {
  let openAccountId = null;

    beforeEach(()=>{
         element.select(openAccountPage.selectCustomer, accountId);
         element.select(openAccountPage.selectCurrency, "Dollar");
         element.click(openAccountPage.processButton);

         cy.on("window:alert", (txt) => {
           const alertMsg =
             "Account created successfully with account Number :";
           openAccountId = txt.replace(alertMsg, "");
         });
    })
    it("displays the correct web title", () => {
      element.click(managerLoginPage.customersButton);
      const elmSearchCustomers = customersPage.searchField;
      element.fillfield(elmSearchCustomers, openAccountId);
      element.click(customersPage.deleteCustomersButton);

      assert.shouldNotHaveText(customersPage.table, openAccountId);
    });
  });
});
