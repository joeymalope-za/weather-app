/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['openweathermap.org','webartdevelopers.com'],
    },
    env: {
        NEXT_PUBLIC_OPEN_WEATHER_API_KEY: '589145f773fe588b9fccb3c0ec5da26b',
    },
}

module.exports = nextConfig
