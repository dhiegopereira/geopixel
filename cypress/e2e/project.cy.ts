/// <reference types="cypress" />
import { getFormattedDate, convertStringToDate } from '../../src/utils/date';

const PROJECT_URL = 'http://localhost:3000/';
const INPUT_SEARCH_CITY = '[data-cy=search-city]';
const WEATHER_FORECAST_TITLE = '[data-cy=weather-forecast-title]'; 

describe('e2e', () => {
  describe('Weather Forecast', () => {
    it('Should search for the city Sobral and return Forecast for Today', () => {
      cy.visit(PROJECT_URL);
      cy.get(INPUT_SEARCH_CITY).type('Sobral').type('{enter}');
      cy.get(WEATHER_FORECAST_TITLE).should('contain', 'Previsão para Hoje');
    });
   
    it('Should look for the city Sobral and return Forecast for 3 days from now', () => {
      const today = new Date();
      const todayOneMore = new Date(today);
      const todayTwoMore = new Date(today);
      const todayThreeMore = new Date(today);

      todayOneMore.setDate(today.getDate() + 1);
      todayTwoMore.setDate(today.getDate() + 2);
      todayThreeMore.setDate(today.getDate() + 3);

      const formattedTodayOneMore = getFormattedDate(todayOneMore);
      const formattedTodayTwoMore = getFormattedDate(todayTwoMore);
      const formattedTodayThreeMore = getFormattedDate(todayThreeMore);

      cy.visit(PROJECT_URL);
      cy.get(INPUT_SEARCH_CITY).type('Sobral').type('{enter}');

      // Verifica se as datas estão presentes nas li
      cy.get(WEATHER_FORECAST_TITLE).should('contain', formattedTodayOneMore);
      cy.get(WEATHER_FORECAST_TITLE).should('contain', formattedTodayTwoMore);
      cy.get(WEATHER_FORECAST_TITLE).should('contain', formattedTodayThreeMore);
    });
  });
});
