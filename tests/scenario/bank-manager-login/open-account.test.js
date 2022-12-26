import * as assert from "@helper/asserts";
import * as route from "@helper/route";
import * as element from "@helper/element";
import * as dtCs from "@tests/data/customer.data";
import { ROUTES } from "@tests/const/routes";
import * as loginPage from "@tests/page/login.page";
import * as managerLoginPage from "@tests/page/bank-manager-login.page";
import * as addAccountPage from "@tests/page/add-account.page";
import * as openAccountPage from "@tests/page/open-account.page";

describe("Open Account Page", () => {
  describe("Positive Case", () => {

    let accountId = null;
    before(() => {
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
    });

    it("Verify Open Account submission when the form is submitted with valid input", () => {
      element.click(loginPage.managerLoginButton);
      element.click(managerLoginPage.openAccountButton);

      element.select(openAccountPage.selectCustomer, accountId);
      assert.shouldHaveValue(openAccountPage.selectCustomer, accountId);

      element.select(openAccountPage.selectCurrency, "Dollar");
      assert.shouldHaveValue(openAccountPage.selectCurrency, "Dollar");
      element.click(openAccountPage.processButton);

      assert.shouldHaveValue(openAccountPage.selectCustomer, "");
      assert.shouldHaveValue(openAccountPage.selectCurrency, "");
      //  cy.on("window:alert", (txt) => {
      //    const alertMsg = "Account created successfully with account Number :";
      //    const openAccountId = txt.replace(alertMsg, "");
      //    console.log(openAccountId);
      //  });
    });
  });

  describe("Negative Case", () => {

    beforeEach(()=>{
       route.visit(ROUTES.addCustomers);
       element.click(managerLoginPage.openAccountButton);
    });

    describe('With Empty Data', () => { 
      it("Verify Open Account submission when the form is submitted with empty data", () => {
          element.click(openAccountPage.processButton);
          cy.get(openAccountPage.selectCustomer).then(($input) => {
            expect($input[0].validationMessage).to.eq(
              "Please select an item in the list."
            );
          });
      });
     });

    describe('With 1 Data', () => { 
      it("Verify Open Account submission when the form is submitted with Customer Data", () => {
         element.select(openAccountPage.selectCustomer, 1);
         element.click(openAccountPage.processButton);

         cy.get(openAccountPage.selectCurrency).then(($input) => {
           expect($input[0].validationMessage).to.eq(
             "Please select an item in the list."
           );
         });
      });

      it("Verify Open Account submission when the form is submitted with Currency Data", () => {
         element.select(openAccountPage.selectCurrency, "Dollar");
         element.click(openAccountPage.processButton);

         cy.get(openAccountPage.selectCustomer).then(($input) => {
           expect($input[0].validationMessage).to.eq(
             "Please select an item in the list."
           );
         });
      });

     });
  });

});
