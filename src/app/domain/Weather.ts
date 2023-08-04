export interface currentWeather {
    dateTime: Date;
    weatherData: WeatherData;
}

export interface WeatherData {
    temp: number;
    humidity: number;
    feels_like: number;
    wind_speed: number;
    label: string;
    description: string;
    icon: string;
}

export interface ForecastDay{
    date: string;
    times: ForecastTime[];
}

export interface ForecastTime{
    timeIndex: string, 
    data: WeatherData
}

export interface City {
    name: string;
    countryCode: string;
    coord: coord;
    timezone: number;
}

export interface CityWeatherData{
    city: City;
    data: WeatherData;
}

export interface coord {
    lat: number;
    lon: number;
};
