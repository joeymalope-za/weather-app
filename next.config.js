/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['openweathermap.org','webartdevelopers.com'],
    },
    env: {
        NEXT_PUBLIC_OPEN_WEATHER_API_KEY: '65159de347325d396266fb7fbfd42fc1',
    },
}

module.exports = nextConfig
