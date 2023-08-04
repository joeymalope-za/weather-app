"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState, useContext, use } from 'react';
import { getCitiesWeather, getTemperatureAsCelsius, testConnection} from './services/weather.service';
import Link from 'next/link';
import ErrorBoundary from './ErrorBoundary';
import { globalStateContext } from './context/globalState.context';

export default function Home() {
  const [cities, setCities] = useState([])
  const [currentCity, setCurrentCity] = useState<any>(null)
  const AuthorisationStatus = useContext<any>(globalStateContext);

  const [unauthorized, setUnauthorized] = useState('');
  useEffect(() => {

    testConnection().catch((err: any) => {
      console.log(err);
    })

    if(cities.length === 0)
    getCitiesWeather().then((data: any) => {
      setCities(data);
      setCurrentCity(data[0]);
    })
  }, [])

  useEffect(() => {
    AuthorisationStatus.then((data: any) => {
      let temp = data.AuthorisationStatus;
      setUnauthorized(temp);
    })
  }, [AuthorisationStatus])

  useEffect(() => {
    if(unauthorized !== 'OK'){
      throw new Error('You have an Unauthorized API key. Please check your API key and try again. If you do not have an API key, you can get one at https://openweathermap.org/api');
    }

  }, [unauthorized])

  return (
    <ErrorBoundary>
      <main className={styles.main}>
        <div className={styles.content}>
      { currentCity && <div className={styles.center}>
            <h1 className={styles.currentCityName}>
              {currentCity?.city?.name} <br/>
            </h1>
            <p>
              {new Date().toDateString()}
            </p>
            <h2 className={styles.currentCityTemp}>
              {getTemperatureAsCelsius(currentCity?.data?.temp)}°C <br/>
            </h2>
            <h3 className={styles.currentWeatherDescription}>
              {currentCity?.data?.description.toUpperCase()}
            </h3>
          </div>}
        <div>
          <h1> Cities
          </h1>
          <div className={styles.grid} >
            {cities.length > 0 && cities.map((weatherData: any) =>{
              const {city, data} = weatherData;

              return (
                <Link href={`/city/${city?.name}-${city?.countryCode}`} key={city?.name+city?.countryCode}
                onClick={() => {
                  setCurrentCity(city);
                }}
                  className={styles.card}
                  rel="noopener noreferrer"
                >
                  <h1 className={styles.temp}>
                    {getTemperatureAsCelsius(data.temp)}°C <br/>
                  </h1>
                  <h2>
                    {city?.name} <br/>
                  </h2>
                  <h3>
                    {data.label}
                  </h3>
                  <p>{data.label}, {data.description}</p>
                  <span><Image src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={''} width={32} height={32}/></span>
                </Link>
                )
            })}
          </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  )
}
