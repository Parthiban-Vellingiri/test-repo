// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { getPastTimeFromCurrentTime, getFutureTimeFromCurrentTime } from "../integration/utils/Helper";
import moment from "moment";


Cypress.Commands.add('loginBaseUrl', (email, password) => {
    cy.visit(Cypress.env('BaseUrl') + '/login').then((res) => {
        cy.get('#user_login_email').type(email)
        cy.get('#user_login_password').type(password)
        cy.get('[type="submit"]').click();
    });
});

Cypress.Commands.add('addNewBooking', (params) => {
    cy.get('[data-testid="registrationAC"]').type(params.ACRegistraion);
    cy.get('.rcc-select__option').should('be.visible');
    cy.get('.rcc-select__option').contains(params.ACRegistraion).click();

    cy.get('[data-testid="operator"]').type(params.operator);
    cy.get('.rcc-select__option').should('be.visible');
    cy.get('.rcc-select__option').contains(params.operator).click();

    cy.get('[data-testid="debtor"]').type(params.debtor);
    cy.get('.rcc-select__option').should('be.visible');
    cy.get('.rcc-select__option').contains(params.operator).click();


    const customPastCurrentTime = getPastTimeFromCurrentTime(params.pastHour);
    const customFutureCurrentTime = getFutureTimeFromCurrentTime(params.futureHour);

    console.log(customFutureCurrentTime);
    cy.get('[data-testid="arrivalDate"]').type(customPastCurrentTime.date);
    cy.get('[data-testid="arrivalTime"').type(customPastCurrentTime.time);
    cy.get('[data-testid="departureDate"]').type(customFutureCurrentTime.date);
    cy.get('[data-testid="departureTime"').type(customFutureCurrentTime.time);
    cy.get(':nth-child(1) > [data-testid="field-group"] > :nth-child(3) > :nth-child(3) > :nth-child(1) > [data-testid="movementCode"] > .css-b62m3t-container > .rcc-select__control > .rcc-select__value-container').type(params.movementCode);
    cy.get('.rcc-select__option').should('be.visible');
    cy.get('.rcc-select__option').contains(params.movementCode).click();
    cy.get('.mb10 > [data-testid="movementCode"] > .css-b62m3t-container > .rcc-select__control > .rcc-select__value-container').type(params.movementCode);
    cy.get('.rcc-select__option').should('be.visible');
    cy.get('.rcc-select__option').contains(params.movementCode).click();
    cy.get('#react-select-13-input').type(params.flightType);
    cy.get('.rcc-select__menu')
        .find('.rcc-select__option')
        .filter((index, element) => Cypress.$(element).text() === params.flightType)
        .click();
    cy.get('[data-testid="booking-submit-button"]').click();
    cy.get('[data-testid="booking-submit-loader"]').should('be.visible');
    cy.get('[data-testid="booking-submit-loader"]').should('not.exist');
});

Cypress.on(
    'uncaught:exception',
    (err) => !err.message.includes('ResizeObserver loop limit exceeded')
);

Cypress.Commands.add('navigateToGivenDate', (date) => {
    let currentDate = moment();
    const targetDate = moment(date);
    const monthDiff = targetDate.diff(currentDate, 'months', true);
    const currentMonth = currentDate.month();
    const targetMonth = targetDate.month();
    if (currentMonth !== targetMonth) {
        const buttonSelector = monthDiff > 0 ? '.react-calendar__navigation__next-button' : '.react-calendar__navigation__prev-button';
        const absMonthDiff = Math.abs(monthDiff);

        for (let i = 0; i < absMonthDiff; i++) {
            cy.get(buttonSelector).click();
        }
    }
    const dateformat = targetDate.format('MMMM D, YYYY');
    cy.get(`[aria-label="${dateformat}"]`).click();
});
Cypress.Commands.add('getFutureWeekendDays', (givenDate) => {
    const date = moment(givenDate);
    const daysUntilSaturday = (6 - date.day() + 7) % 7;
    const daysUntilSunday = (7 - date.day() + 7) % 7;
    const nearestSaturday = date.clone().add(daysUntilSaturday, 'days');
    const nearestSunday = date.clone().add(daysUntilSunday, 'days');
    const formattedNearestSaturday = nearestSaturday.format('YYYY-MM-DD');
    const formattedNearestSunday = nearestSunday.format('YYYY-MM-DD');

    return {
        saturday: formattedNearestSaturday,
        sunday: formattedNearestSunday
    }
});
    