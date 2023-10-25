/// <reference types="Cypress" />
import moment from "moment";
import AppConstants from "../../utils/AppConstants";

describe('Parking /Hangarage Charges', () => {

    before(function () {
        cy.loginBaseUrl(Cypress.env('loginCredential').email, Cypress.env('loginCredential').password);
    });

    it('C8695', async function () {
        Cypress.config('defaultCommandTimeout', 100000);
        cy.get(':nth-child(5) > div > .main-nav__link--with-children').realHover();
        cy.wait(100);
        cy.contains('Live').realClick();
        cy.wait(1000);
        cy.get('.toggle-date > :nth-child(3)').click();
        cy.wait(1000);

        
        const givenNewDate = '2022-11-28';
        cy.navigateToGivenDate(givenNewDate);
        cy.get('[data-testid="loader"]').should('be.visible');
        cy.get('[data-testid="loader"]').should('not.exist');
        // cy.reload();
        // cy.get('[data-testid="loader"]').should('be.visible');
        // cy.get('[data-testid="loader"]').should('not.exist');



        // const givenDate = '2023-10-10';
        // // const givenDate = moment().format('YYYY-MM-DD')
        // cy.get('.toggle-date > :nth-child(3)').click();
        // cy.wait(1000);
        // cy.getFutureWeekendDays(givenDate).then(async(result)=>{
        //     cy.navigateToGivenDate(result.saturday);
        // });


    })
})