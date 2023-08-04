import { ForecastedDays } from "../components/ForecastedDays";
import { City, CityWeatherData, WeatherData } from "../domain/Weather";

export function adaptToWeatherData(data:any):WeatherData {
    return {
            temp: data.main.temp,
            humidity: data.main.humidity,
            feels_like: data.main.feels_like,
            wind_speed: data.wind.speed,
            label: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        }
}

export function adaptToCurrentWeather(data:any):any {
    return {
        name: data.name,
        countryCode: data.sys.country,
        coord: data.coord,
    }
}

export function adaptToCity(data:any):City {
    return {
        name: data.name,
        countryCode: data.sys.country,
        coord: data.coord,
        timezone: data.timezone
    }
}   

export function adaptToCityWeatherData(data:any):CityWeatherData {
    return {
        city: adaptToCity(data),
        data: adaptToWeatherData(data)
    }
}
