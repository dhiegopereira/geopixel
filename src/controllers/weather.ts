import { City, Weather, WeatherData } from './../interfaces/weatherTypes';
import { Request, Response } from 'express'; 
import { getFormattedDate, convertStringToDate } from '../utils/date';

let cities: City[] = [];
let weathers: Weather[] = [];
let data: WeatherData | null = null;

const translations: Record<string, string> = {
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

export const getWeatherCurrent = async (req: Request, res: Response) => {
   if (req && req.query.cityName) {
      const cityName = req.query.cityName as string;
      const cityTemp: any = await geolocation(cityName);
      
      const existingCity = cities.find(city => city.name === cityTemp.name);
      if (!existingCity) {
         cities.push(cityTemp);
      }
      weathers = await weatherForecast(cityName);
      data = { cities, weathers };
   }
   return res.render('index', { data });
};

export const geolocation = async (cityName: string): Promise<City | undefined> => {
   try {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${process.env.GOOGLE_API_KEY}`;

      const response = await fetch(apiUrl);
      const responseData = await response.json();

      if (responseData.status === 'OK') {
         const addressComponents = responseData.results[0].address_components;
         const location = responseData.results[0].geometry.location;

         return { name: addressComponents[0].long_name, location }
      } else {
         console.error(`Failed to retrieve geolocation for ${cityName}`);
      }
   } catch (error) {
      console.error('Error:', error);
   }
};



export const weatherForecast = async (cityName: string): Promise<Weather[] | []> => {
   const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

   try {
      const response = await fetch(apiUrl);
      const responseData = await response.json();
      const weathersTemp: Weather[] = [];

      responseData.list.forEach((item: any) => {
         const date = getFormattedDate(convertStringToDate(item.dt_txt.split(' ')[0]));
         const temperature = item.main.temp;
         const maxTemperature = item.main.temp_max;
         const minTemperature = item.main.temp_min;
         const weatherDescriptionEnglish: string = item.weather[0].description;
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

   } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
   }
};