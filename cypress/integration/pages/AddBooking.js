import AppConstants from "../utils/AppConstants";
import MagicNumber from "../utils/MagicNumber";

class AddBooking {

    otherInforTab = '[data-testid="other-info-tab"]';

    chargesTab = '[data-testid="charges-tab"]';

    flightDetailsTab = '[data-testid="flight-details-tab"]';

    editLocationHistory = '[data-testid="option--edit-AC-location-history"]';

    editLocationButton = '[data-testid="edit-booking-button"]';

    bookingSubmitButton = '[data-testid="booking-submit-button"]';

    addBookingButton = '[data-testid="new-booking-button"]';

    addBookingButtonClick(){
        cy.get(this.addBookingButton).invoke('removeAttr', 'target').click();
    }

    otherInfoTabClick() {
        cy.get(this.otherInforTab).click()
    }

    editLocationClick(option) {
        cy.get(this.editLocationHistory).click();
        cy.get('.ac-location-history__title').should('be.visible');
        cy.get('#react-select-15-input').type(option);
        cy.wait(200);
        cy.get('.rcc-select__option').should('be.visible');
        cy.get('.rcc-select__option').contains(option).click();
        cy.get('button[type="submit"]').click();
    }

    chargesTabClick() {
        cy.get(this.chargesTab).click();
    }

    flightDetailsTabClick() {
        cy.get(this.flightDetailsTab).click();
    }

    editLocationButtonClick(){
        cy.get(this.editLocationButton).click();
    }

    bookingSubmitButtonClick(){
        cy.get(this.bookingSubmitButton).click();
    }

    chargersTableLoader() {
        cy.get('.rcc-tabs__content > [data-testid="loader"]').should('be.visible');
        cy.get('.rcc-tabs__content > [data-testid="loader"]').should('not.exist');
    }

    recalculatingCharges(time) {
        for (let i = 0; i <= time; i++) {
            cy.get('[data-testid="header-actions"]').click();
            cy.get('[data-testid="header-recalculate"]').click();
            cy.get('[data-testid="header-actions"]').click();
            cy.get('.rcc-multi-option-button__menu_item').should('be.visible');
            cy.get('.rcc-multi-option-button__menu_item_text').should('include.text', 'Recalculating');
            cy.get('.rcc-multi-option-button__menu_item_text').should('not.include.text', 'Recalculating')
        }
    }

    chargeValidationForEastApron(value) {
        cy.get('tr td:nth-child(1)').each(($li, index) => {
            const charge = $li.text();
            if (charge.includes('EAST')) {
                cy.get('tr td:nth-child(17)').eq(index).next().then((res) => {
                    const value = res.text()
                    expect(value).to.equal(value)
                })
            }
        })
    }

    bookingDebtorChange(option){
        cy.get('[data-testid="debtor"]').type(option);
        cy.get('.rcc-select__option').should('be.visible');
        cy.get('.rcc-select__option').contains(option).click();
    }

    pageTitleCheck(value){
        cy.get('.rcc-page__title').then((li) => {
            const title = li.text();
            expect(title).to.be.equal(value);
        })
    }

    pageHeaderCheck(value){
        cy.get('.page-header').then(($li) => {
            expect($li.text()).to.be.includes(value);
        });
    }

    sideMenuHover(){
        cy.get(':nth-child(5) > div > .main-nav__link--with-children').realHover();
    }

    sideMenuClick(value){
        cy.contains(value).realClick();
    }

    pageWait(value){
        cy.wait(value);
    }

    getNewBookingParams(){
       const params = {
            ACRegistraion: AppConstants.ACRegistraion,
            pastHour: MagicNumber.NUMBER1,
            futureHour: MagicNumber.NUMBER24,
            flightType: AppConstants.flightTypes.private,
            operator: AppConstants.operator,
            debtor: AppConstants.debtor,
            movementCode: AppConstants.movementCode
        }
        return params;

    }

}


module.exports = new AddBooking();