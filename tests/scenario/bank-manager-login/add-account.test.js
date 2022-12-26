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

  describe("Negative Case", () => {
    describe("with empty data", () => {
      it("Verify Add Account submission when the form is submitted with empty data", () => {
        element.click(loginPage.managerLoginButton);
        element.click(managerLoginPage.addAccountButton);
        element.click(addAccountPage.addCustomersButton);
        const elmFirstname = addAccountPage.firstnameField;
        cy.get(elmFirstname).then(($input) => {
          expect($input[0].validationMessage).to.eq(
            "Please fill out this field."
          );
        });
      });
    });

    describe("with 1 data", () => {
      it("Verify Add Account submission when the form is submitted with input only firstname field", () => {
        element.click(loginPage.managerLoginButton);
        element.click(managerLoginPage.addAccountButton);
        element.click(addAccountPage.addCustomersButton);
        const elmFirstname = addAccountPage.firstnameField;
        const valFirstname = dtCs.CUSTOMER_REGISTERED.firstname;
        element.fillfield(elmFirstname, valFirstname);
        
        const elmLastname = addAccountPage.lastnameField;
        cy.get(elmLastname).then(($input) => {
          expect($input[0].validationMessage).to.eq(
            "Please fill out this field."
          );
        });
      });

      it("Verify Add Account submission when the form is submitted with input only lastname field", () => {
        element.click(loginPage.managerLoginButton);
        element.click(managerLoginPage.addAccountButton);
        element.click(addAccountPage.addCustomersButton);
        const elmLastname = addAccountPage.lastnameField;
        const valLastname = dtCs.CUSTOMER_REGISTERED.lastname;
        element.fillfield(elmLastname, valLastname);

        const elmFirstname = addAccountPage.firstnameField;
        cy.get(elmFirstname).then(($input) => {
          expect($input[0].validationMessage).to.eq(
            "Please fill out this field."
          );
        });
      });
      
      it("Verify Add Account submission when the form is submitted with input only postcode field", () => {
        element.click(loginPage.managerLoginButton);
        element.click(managerLoginPage.addAccountButton);
        element.click(addAccountPage.addCustomersButton);
        const elmPostcode = addAccountPage.postcodeField;
        const valPostcode = dtCs.CUSTOMER_REGISTERED.postCode;
        element.fillfield(elmPostcode, valPostcode);

        const elmFirstname = addAccountPage.firstnameField;
        cy.get(elmFirstname).then(($input) => {
          expect($input[0].validationMessage).to.eq(
            "Please fill out this field."
          );
        });
      });
    });

     describe("with 2 data", () => {
       it("Verify Add Account submission when the form is submitted with only firstname & lastname field", () => {
         element.click(loginPage.managerLoginButton);
         element.click(managerLoginPage.addAccountButton);
         element.click(addAccountPage.addCustomersButton);

         // Input Firstname
         const elmFirstname = addAccountPage.firstnameField;
         const valFirstname = dtCs.CUSTOMER_REGISTERED.firstname;
         element.fillfield(elmFirstname, valFirstname);

         // Input Lastname
         const elmLastname = addAccountPage.lastnameField;
         const valLastname = dtCs.CUSTOMER_REGISTERED.lastname;
         element.fillfield(elmLastname, valLastname);

         // Input Postcode
         element.click(addAccountPage.addCustomersButton);

         const elmPostcode = addAccountPage.postcodeField;
         cy.get(elmPostcode).then(($input) => {
           expect($input[0].validationMessage).to.eq(
             "Please fill out this field."
           );
         });
       });

        it("Verify Add Account submission when the form is submitted with only firstname & postcode field", () => {
          element.click(loginPage.managerLoginButton);
          element.click(managerLoginPage.addAccountButton);
          element.click(addAccountPage.addCustomersButton);

          // Input Firstname
          const elmFirstname = addAccountPage.firstnameField;
          const valFirstname = dtCs.CUSTOMER_REGISTERED.firstname;
          element.fillfield(elmFirstname, valFirstname);

          // Input Postcode
          const elmPostcode = addAccountPage.postcodeField;
          const valPostcode = dtCs.CUSTOMER_REGISTERED.postCode;
          element.fillfield(elmPostcode, valPostcode);

          element.click(addAccountPage.addCustomersButton);

          const elmLastname = addAccountPage.lastnameField;
          cy.get(elmLastname).then(($input) => {
            expect($input[0].validationMessage).to.eq(
              "Please fill out this field."
            );
          });
        });

         it("Verify Add Account submission when the form is submitted with only lastname & postcode field", () => {
           element.click(loginPage.managerLoginButton);
           element.click(managerLoginPage.addAccountButton);
           element.click(addAccountPage.addCustomersButton);

           // Input Lastname
           const elmLastname = addAccountPage.lastnameField;
           const valLastname = dtCs.CUSTOMER_REGISTERED.lastname;
           element.fillfield(elmLastname, valLastname);

           // Input Postcode
           const elmPostcode = addAccountPage.postcodeField;
           const valPostcode = dtCs.CUSTOMER_REGISTERED.postCode;
           element.fillfield(elmPostcode, valPostcode);

           element.click(addAccountPage.addCustomersButton);
           const elmFirstname = addAccountPage.firstnameField;
           cy.get(elmFirstname).then(($input) => {
             expect($input[0].validationMessage).to.eq(
               "Please fill out this field."
             );
           });

         });

     });

  });
});
