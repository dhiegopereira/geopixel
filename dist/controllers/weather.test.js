"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weather_1 = require("./weather");
const date_1 = require("../utils/date");
const chai_1 = require("chai");
describe('Geolocation', () => {
    it('should search the city and return your lat and lng', async () => {
        const cityName = 'Sobral';
        const expected = {
            name: 'Sobral',
            location: { lat: -3.6844057, lng: -40.35617939999999 }
        };
        const received = await (0, weather_1.geolocation)(cityName);
        (0, chai_1.expect)(received).to.deep.equal(expected);
    });
});
describe('Weather Forecast', () => {
    it('should retrieve the weather forecast for a city', async () => {
        const cityName = 'Sobral';
        const today = new Date();
        const expected = (0, date_1.getFormattedDate)(today);
        const receivedWeather = await (0, weather_1.weatherForecast)(cityName);
        (0, chai_1.expect)(receivedWeather.length).to.deep.equal(4);
        (0, chai_1.expect)(receivedWeather[0].date).to.deep.equal(expected);
    });
});
