import * as assert from "@helper/asserts";
import * as route from "@helper/route";
import * as element from "@helper/element";
import * as dtCs from "@tests/data/customer.data";
import { ROUTES } from "@tests/const/routes";
import * as loginPage from "@tests/page/login.page";
import * as managerLoginPage from "@tests/page/bank-manager-login.page";
import * as addAccountPage from "@tests/page/add-account.page";
import * as customersPage from "@tests/page/customers.page";

describe("Add Account Page", () => {
  beforeEach(() => {
    route.visit(ROUTES.login);
  });

  describe("Positive Case", () => {
    it("Verify Add Account submission when the form is submitted with valid input", () => {
      element.click(loginPage.managerLoginButton);
      element.click(managerLoginPage.addAccountButton);

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

      const valFirstnameEmpty = dtCs.CUSTOMER_EMPTY.firstname;
      const valLastnameEmpty = dtCs.CUSTOMER_EMPTY.firstname;
      const valPostcodeEmpty = dtCs.CUSTOMER_EMPTY.postCode;
      // assert
      assert.shouldContainText(elmFirstname, valFirstnameEmpty);
      assert.shouldContainText(elmLastname, valLastnameEmpty);
      assert.shouldContainText(elmPostcode, valPostcodeEmpty);

      element.click(managerLoginPage.customersButton);

      const elmSearchCustomers = customersPage.searchField;
      element.fillfield(elmSearchCustomers, valFirstname);

      // assert
      const elmTableCustomers = customersPage.table;
      assert.shouldContainText(elmTableCustomers, valFirstname);
      assert.shouldContainText(elmTableCustomers, valLastname);
      assert.shouldContainText(elmTableCustomers, valPostcode);
    });
  });

});
