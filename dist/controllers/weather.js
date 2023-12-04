"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherForecast = exports.geolocation = exports.getWeatherCurrent = void 0;
const date_1 = require("../utils/date");
let cities = [];
let weathers = [];
let data = null;
const translations = {
    "clear sky": "céu limpo",
    "few clouds": "poucas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens quebradas",
    "shower rain": "chuva isolada",
    "rain": "chuva",
    "thunderstorm": "trovoada",
    "snow": "neve",
    "mist": "névoa",
    "light rain": "chuva leve",
    "moderate rain": "chuva moderada"
};
const getWeatherCurrent = async (req, res) => {
    if (req && req.query.cityName) {
        const cityName = req.query.cityName;
        const cityTemp = await (0, exports.geolocation)(cityName);
        const existingCity = cities.find(city => city.name === cityTemp.name);
        if (!existingCity) {
            cities.push(cityTemp);
        }
        weathers = await (0, exports.weatherForecast)(cityName);
        data = { cities, weathers };
    }
    return res.render('index', { data });
};
exports.getWeatherCurrent = getWeatherCurrent;
const geolocation = async (cityName) => {
    try {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${process.env.GOOGLE_API_KEY}`;
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        if (responseData.status === 'OK') {
            const addressComponents = responseData.results[0].address_components;
            const location = responseData.results[0].geometry.location;
            return { name: addressComponents[0].long_name, location };
        }
        else {
            console.error(`Failed to retrieve geolocation for ${cityName}`);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
};
exports.geolocation = geolocation;
const weatherForecast = async (cityName) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        const weathersTemp = [];
        responseData.list.forEach((item) => {
            const date = (0, date_1.getFormattedDate)((0, date_1.convertStringToDate)(item.dt_txt.split(' ')[0]));
            const temperature = item.main.temp;
            const maxTemperature = item.main.temp_max;
            const minTemperature = item.main.temp_min;
            const weatherDescriptionEnglish = item.weather[0].description;
            const weatherDescriptionPortuguese = translations[weatherDescriptionEnglish] || weatherDescriptionEnglish;
            const weatherDescription = weatherDescriptionPortuguese;
            const iconUrl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
            const existingWeather = weathersTemp.find(weather => weather.date === date);
            if (!existingWeather && weathersTemp.length < 4) {
                weathersTemp.push({
                    date,
                    temperature,
                    maxTemperature,
                    minTemperature,
                    weatherDescription,
                    iconUrl
                });
            }
        });
        return weathersTemp;
    }
    catch (error) {
        console.error('Error fetching weather forecast:', error);
        throw error;
    }
};
exports.weatherForecast = weatherForecast;
