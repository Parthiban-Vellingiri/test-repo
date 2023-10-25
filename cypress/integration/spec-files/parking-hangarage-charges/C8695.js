/// <reference types="Cypress" />
import AppConstants from "../../utils/AppConstants";
import NewBookingPage from "../../pages/AddBooking";

describe('Parking /Hangarage Charges', () => {

    before(function () {
        cy.loginBaseUrl(Cypress.env('loginCredential').email, Cypress.env('loginCredential').password);
    });

    it('C8695', async function () {
        NewBookingPage.pageHeaderCheck(AppConstants.pageHeader.dashboard)
        NewBookingPage.sideMenuHover();
        NewBookingPage.pageWait(100);
        NewBookingPage.sideMenuClick('Live')
        NewBookingPage.pageWait(100);
        NewBookingPage.pageTitleCheck(AppConstants.pageHeader.movementList);
        NewBookingPage.addBookingButtonClick();
        const params = NewBookingPage.getNewBookingParams();
        cy.addNewBooking(params).then(() => {
            NewBookingPage.pageWait(2000);
            NewBookingPage.pageTitleCheck('View booking');
        }).then(() => {
            NewBookingPage.otherInfoTabClick();
            NewBookingPage.editLocationClick(AppConstants.location.eastapron);
        }).then(() => {
            NewBookingPage.chargesTabClick();
            NewBookingPage.chargersTableLoader();
            NewBookingPage.recalculatingCharges(3);
            NewBookingPage.pageWait(10000);
            NewBookingPage.chargeValidationForEastApron(150.00);
            NewBookingPage.flightDetailsTabClick();
            NewBookingPage.editLocationButtonClick();
            NewBookingPage.bookingDebtorChange('CBD01');
            NewBookingPage.bookingSubmitButtonClick();
            NewBookingPage.chargesTabClick();
            NewBookingPage.chargersTableLoader();
            NewBookingPage.recalculatingCharges(3);
            NewBookingPage.pageWait(10000);
            NewBookingPage.chargeValidationForEastApron(0.00);
        });


    })
})