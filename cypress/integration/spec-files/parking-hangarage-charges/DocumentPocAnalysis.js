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


        // cy.visit('https://colossusqa-fab.i6clouds.com/business-aviation/booking');
        // cy.get(':nth-child(1) > [data-testid="field-group"] > :nth-child(2) > .rcc-col-sm-8 > .rcc-row > :nth-child(1) > .mb10 > .rcc-control-group > .rcc-date-input > .rcc-date-picker__actions > .rcc-date-picker__calendar-icon').click();
        // // const givenNewDate = '2023-11-30';
        //  const givenNewDate = moment().format('YYYY-MM-DD')
        // cy.getFutureWeekendDays(givenNewDate).then(async(result)=>{
        //     cy.navigateToGivenDate(result.saturday);
        // });
        // cy.get(':nth-child(2) > [data-testid="field-group"] > :nth-child(2) > .rcc-col-sm-8 > .rcc-row > :nth-child(1) > .mb10 > .rcc-control-group > .rcc-date-input > .rcc-date-picker__actions').click();
        // cy.getFutureWeekendDays(givenNewDate).then(async(result)=>{
        //     cy.navigateToGivenDate(result.sunday);
        // });

        let fileName ='report_Daily_Passenger_Details'
        const expectedTimestamp = moment.utc().add(1, 'hours').valueOf();
        console.log(expectedTimestamp);
        cy.get(':nth-child(1) > .rcc-multi-option-button__container_button > .rcc-button').click();
        cy.get('.rcc-multi-option-button__menu_item').should('be.visible');
        cy.get('.rcc-multi-option-button__menu_item_text').contains('Daily Passenger Details').click();
        
      

        cy.wait(5000); // Adjust the timeout as needed
        cy.task('listFiles', {
            downloadsFolder: Cypress.config('downloadsFolder'),
        });

    })
})