import { geolocation, weatherForecast } from './weather';
import { getFormattedDate } from '../utils/date';
import { expect } from 'chai'; 


describe('Geolocation', () => {
    it('should search the city and return your lat and lng', async () => {
        const cityName = 'Sobral';
        const expected = {
            name: 'Sobral',
            location: { lat: -3.6844057, lng: -40.35617939999999 }
        };

        const received = await geolocation(cityName);

        expect(received).to.deep.equal(expected);
    });
});

describe('Weather Forecast', () => {
    it('should retrieve the weather forecast for a city', async () => {
        const cityName = 'Sobral';
        const today = new Date();
        const expected = getFormattedDate(today);
        const receivedWeather = await weatherForecast(cityName);
        expect(receivedWeather.length).to.deep.equal(4);
        expect(receivedWeather[0].date).to.deep.equal(expected);
    });
});

