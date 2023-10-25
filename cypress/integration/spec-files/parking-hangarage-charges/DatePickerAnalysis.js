/// <reference types="Cypress" />
import AppConstants from "../../utils/AppConstants";

describe('Parking /Hangarage Charges', () => {

    before(function () {
        cy.loginBaseUrl(Cypress.env('loginCredential').email, Cypress.env('loginCredential').password);
    });

    it('C8695', async function () {
        Cypress.config('defaultCommandTimeout', 100000);
        cy.get(':nth-child(5) > div > .main-nav__link--with-children').realHover();
        cy.wait(100);
        cy.contains('Live').click();
  
      // Replace 'desiredDate' with the date you want to select (e.g., '2023-10-15')
    //   cy.selectDateInReactCalendar('2023-10-15');
    let nextDate="13 January 2022";
        // cy.get('.toggle-date > :nth-child(3)').click();
        // cy.wait(1000);
        // cy.get('.react-calendar__month-view__days >')
        // .not('[disabled]')
        // .each((elem) => {
        //     if (elem.text() === nextDate.toString()) {
        //         elem.click();
        //     }
        // });
        // cy.get('.calendar-container .day[data-date="2023-10-15"]').click({force:true});

        // cy.get('.react-calendar__tile--now abbr[aria-label]').then((li)=>{
        //     li.val('October 14, 2023')
        // })

        // Locate and click on the button to navigate to the previous year
        // cy.get('.react-calendar__navigation__prev-button').click(); // Replace with the correct selector for the previous year button.

        //  Locate and click on the button to navigate to the previous month
        // cy.get('.react-calendar__navigation__prev2-button').click(); // Replace with the correct selector for the previous month button.

        // cy.wait(200);
        // cy.get('.react-datepicker__year-select').select('2023');
        // cy.get('.react-datepicker__month-select').select('9'); // October is 9th month
        
        // cy.contains('.react-datepicker__day', '15').click();

        cy.get('.tabular-list :nth-child(3)').each(($li, index) => {
            const test = $li.text();
        console.log(test)
            if (test.includes('804080')) {
                cy.get('.tabular-list .column-item__id-link').eq(index).invoke('removeAttr', 'target').click({force:true});
            }
        })
        cy.visit('https://colossusqa-fab.i6clouds.com/business-aviation/booking/510a83d7-2605-422c-9c20-e9f1bf3f9d1d')
        cy.get('[data-testid="charges-tab"]').click();
        cy.get('.rcc-tabs__content > [data-testid="loader"]').should('be.visible');
        cy.get('.rcc-tabs__content > [data-testid="loader"]').should('not.exist');
        cy.get('[data-testid="header-actions"]').click();
        cy.get('[data-testid="header-recalculate"]').click();
        cy.get('[data-testid="header-actions"]').click();
        cy.get('.rcc-multi-option-button__menu_item').should('be.visible');
        cy.get('.rcc-multi-option-button__menu_item_text').should('include.text','Recalculating')
                cy.get('.rcc-multi-option-button__menu_item_text').should('not.include.text','Recalculating')
//         cy.get('.rcc-multi-option-button__menu_item_text')
// .then((li)=>{
//             console.log(li)
//             if(li.text().includes('Recalculating')){
                
//             }
//         })
        // cy.get('.rcc-multi-option-button__menu_item').each(($li)=>{
        //     console.log($li.text())
        //     const value = $li.text();
        //     if(value.includes('Recalculating')){
        //         cy.get('.rcc-multi-option-button__menu_item_container rcc-multi-option-button__menu_item_container--disabled').should('be.visible');
        //         cy.get('.rcc-multi-option-button__menu_item_disabled').should('not.exist');
        //     }
        // })
        console.log(232)
        cy.get('tr td:nth-child(1)').each(($li, index) => {
            const charge = $li.text();
            console.log(charge)
            if (charge.includes('PARK')) {
                cy.get('tr td:nth-child(17)').eq(index).next().then((res) => {
                    const value = res.text()
                    console.log(value)
                    expect(value).to.equal(150.00)
                })
            }
        })

    })
})