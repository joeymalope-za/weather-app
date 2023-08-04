# Project title: Pygio Weather app

A brief, descriptive title that accurately reflects the content of the project.

## Introduction

This is a Weather Forecasting App built using Next.js and the OpenWeatherMap API It fetches data from the API and displays weather forecast information.

## OpenWeather API

1. Create a new account.
2. Subscribe to the _Current Weather Data_ and _5 Day / 3 Hour Forecast_

## Getting Started

1. git clone https://github.com/joeymalope-za/weather-app.git
2. cd weather-app
3. npm install
4. touch next.config.js
5. Open the next.config.js and update the API key

## Setup API key on next.config.js

/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
reactStrictMode: true,
images: {
domains: ['openweathermap.org','webartdevelopers.com'],
},
env: {
NEXT_PUBLIC_OPEN_WEATHER_API_KEY: '',
},
}

module.exports = nextConfig

## Usage

start project -> npm run dev

## Credits

This project was built using the OpenWeatherMap API.

## License

This project is licensed under the terms of the MIT License.
