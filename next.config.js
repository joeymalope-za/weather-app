/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['openweathermap.org','webartdevelopers.com'],
    },
    env: {
        NEXT_PUBLIC_OPEN_WEATHER_API_KEY: ''
    },
}

module.exports = nextConfig
