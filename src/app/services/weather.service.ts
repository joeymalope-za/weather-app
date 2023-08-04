import { adaptToCityWeatherData, adaptToWeatherData } from "../adapters/weather.adaptor";
const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/';
const cities = [{
    "name": 'London',
    "country": 'uk'
    },
    {
    "name": 'Tokyo',
    "country": 'jp'
    },
    {
    "name": 'Pretoria',
    "country": 'za'
    }
    ];

export const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

export const getCurrentWeatherByCityName = async (city: string, country: string) => {

    if(city === undefined || country === undefined)         
        throw new Error('Error fetching current weather data');

    try {
        const res = await fetch(`${baseUrl}/data/2.5/weather?q=${city},${country}&appid=${apiKey}`);
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error('Error fetching current weather data');
    }
}

export const testConnection = async () => {
        const res = await fetch(`${baseUrl}/data/2.5/weather?q=London,uk&appid=${apiKey}`);
        return res.statusText;
}

export const getTemperatureAsCelsius = (temp: number) => {
    return Math.round(temp - 273.15);
}

export const getTemperatureAsFahrenheit = (temp: number) => {
    return Math.round((temp - 273.15) * 9 / 5 + 32);
}


export const convertTo12Hour = (time: string): string => {
    let [hours, minutes] = time.split(':');
    let period = +hours >= 12 ? 'PM' : 'AM'; // +hours converts hours to a number

    hours = (+hours % 12 || 12).toString();  
    hours = hours.padStart(2, '0');  

    return `${hours}:${minutes} ${period}`;
}

//getForecastWeatherforNextFiveDays()
export const getForecastWeatherforNextFiveDays = async (lat: number, lon: number) => {
    if(lat === undefined || lon === undefined) return console.log("lat or lon is undefined");

    try {
        const res = await fetch(`${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await res.json();
        return (getForecastDateList(data));
    } catch (err) {
        throw new Error('Error fetching forecast data');

    }
}

export const getCityCoordinates = async (city: string, country: string) => {
    if(city === undefined || country === undefined) return console.log("city or country is undefined");

    try {
        const res = await fetch(`${baseUrl}/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`);
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error('Error fetching city coordinates');

    }
}

export const getCitiesWeather = async () => {
    try{
        let citiesWeather = [];

        for (let i = 0; i < cities.length; i++) {
            const res = await getCurrentWeatherByCityName(cities[i].name, cities[i].country);
            citiesWeather.push(adaptToCityWeatherData(res));
        }

        return citiesWeather;
    }
    catch(err){
        throw new Error('Error fetching cities weather data');
    }
}

export const getForecastDateList = (forecast: any) => {
    if(forecast === undefined) return;   

    const forecastList = forecast.list;

    const newList = forecastList.reduce((acc: any, item: any) => {
        let date = item.dt_txt.split(' ')[0];
        let time = item.dt_txt.split(' ')[1];

        let existingDate = acc.find((i: any) => i.date === date);

        if (existingDate) {
            existingDate.times.push({time: time, data: adaptToWeatherData(item)});
        } else {
            acc.push({date: date, times: [{time: time, data: adaptToWeatherData(item)}]});
        }

        return acc;
    },[]);

    return newList;
} 

export function timezoneToGMT(timezone: number): string {
    const hours = Math.floor(timezone / 3600);
    return `GMT${hours >= 0 ? '+' : ''}${hours}`;
}



