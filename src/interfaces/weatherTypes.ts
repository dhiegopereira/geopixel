export interface City {
    name: string;
    location: {
        lat: number;
        lng: number;
    };
}

export interface Weather {
    date: string;
    temperature: number;
    maxTemperature: number;
    minTemperature: number;
    weatherDescription: string;
    iconUrl: string;
}

export interface WeatherData {
    cities: City[];
    weathers: Weather[];
}
