"use client"
import { ForecastedDays } from "@/app/components/ForecastedDays"; 
import { getCurrentWeatherByCityName, getTemperatureAsCelsius,DAYS, getForecastWeather, convertTo12Hour } from "@/app/services/weather.service";
import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import Link from "next/link";
import Image from "next/image";
import { get } from "http";
import { City, ForecastDay, coord } from "@/app/domain/Weather";

export default function Page(param: any) {
  const [city, setCity] = useState<any>(null);
  const [cityName, countryCode] = param.params.id.split('-');
  const [days, setDays] = useState([]);
  const [currentDay, setCurrentDay] = useState<any>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFullCityWeather = async (cityName: any, countryCode: any) => {
     await getCurrentWeatherByCityName(cityName, countryCode).then((data: any) => {
        setCity(data);
        return data;
    });
    return city;
  }

  useEffect(() => {
    if(city === null)
      getFullCityWeather(cityName,countryCode);
    else{
      const {coord} = city;
      console.log("city: ", city);
        getForecastWeather(coord?.lat, coord?.lon).then((data: any) => {
            console.log("data: ", data);
            if(data){
                setDays(data);
            }
        })
    }
  }, [city, cityName, countryCode, getFullCityWeather ]);

  useEffect(() => {
    if(days.length > 0){
      setCurrentDay(days[0]);
    }
  }, [days]);

  return ( <main className={styles.main}>
            <div className={styles.detailedContent}>
              <div className={styles.mainSection}>
                <span className={styles.back_icon}>
                <Link href={`/`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"/></svg>
                </Link>
                </span>
                <div>
                  <h1 className={styles.sidebar_cityName}>{cityName}</h1> 
                  <h2 className={styles.currentDay}>
                    {(DAYS[new Date(currentDay?.date).getDay()])}
                  </h2>
                </div>
                <div>

                  <div className={styles.hourWeatherBox}>
                    {
                    days?.length > 0  && currentDay?.times.map((time:any)=><div className={styles.hourWeatherItem} key={time?.time}>
                      <span className={styles.temp}>
                      {getTemperatureAsCelsius(city?.main.feels_like)}°C
                      </span><br />
                      <span className={styles.time}>{convertTo12Hour(time?.time)}</span>
                      <br/>
                      <Image src={`https://openweathermap.org/img/wn/${time?.data.icon}.png`} alt={''} width={64} height={64}/>
                    </div>)
                    }
                  </div>
                </div>
              </div>
              <div className={styles.sidebar}>
                <div className={styles.topBar}>
                  <div>
                    <h1 className={styles.sidebar_cityName}>{cityName}</h1> 
                    <h1 className={styles.sidebar_cityTemperature}>
                      {getTemperatureAsCelsius(city?.main?.temp)}°C <br/>
                    </h1>
                    <p className={styles.supporting_txt}>
                      {city?.data?.description.toUpperCase()}
                    </p>
                    <p>
                      {new Date().toDateString()}
                    </p>
                    <br />
                  </div>
                  <div className="">
                    <p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M160 48c-35.3 0-64 28.7-64 64V273.9c0 14.5-5.7 27.1-12.8 36.6C71.1 326.5 64 346.4 64 368c0 53 43 96 96 96s96-43 96-96c0-21.6-7.1-41.5-19.2-57.5c-7.1-9.5-12.8-22.1-12.8-36.6V112c0-35.3-28.7-64-64-64zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V273.9c0 1.7 .7 4.4 3.2 7.8c18.1 24.1 28.8 54 28.8 86.4c0 79.5-64.5 144-144 144S16 447.5 16 368c0-32.4 10.7-62.3 28.8-86.4c2.5-3.4 3.2-6.1 3.2-7.8V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V152c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/></svg>
                      <b> Feels like</b> {getTemperatureAsCelsius(city?.main.feels_like)}°C
                    </p>
                    <p>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M192 480c-88.4 0-160-71.6-160-160c0-16.2 6.1-39.2 18.3-67.5c11.9-27.6 28.5-57.5 46.6-86.8c35.9-58 76.4-110.9 94.5-133.7h1.3c18.1 22.9 58.6 75.7 94.5 133.7c18.1 29.2 34.6 59.1 46.6 86.8C345.9 280.8 352 303.8 352 320c0 88.4-71.6 160-160 160zM0 320C0 426 86 512 192 512s192-86 192-192c0-91.2-130.2-262.3-166.6-308.3C211.4 4.2 202.5 0 192.9 0h-1.8c-9.6 0-18.5 4.2-24.5 11.7C130.2 57.7 0 228.8 0 320zM384 112a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm128 0a80 80 0 1 0 -160 0 80 80 0 1 0 160 0z"/></svg>
                      <b> Humidity </b>{city?.main.humidity}%
                    </p>
                    <p>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 16c0 8.8 7.2 16 16 16h64c26.5 0 48 21.5 48 48s-21.5 48-48 48H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H368c44.2 0 80-35.8 80-80s-35.8-80-80-80H304c-8.8 0-16 7.2-16 16zm64 384c0 8.8 7.2 16 16 16h56c48.6 0 88-39.4 88-88s-39.4-88-88-88H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H424c30.9 0 56 25.1 56 56s-25.1 56-56 56H368c-8.8 0-16 7.2-16 16zM112 512h64c44.2 0 80-35.8 80-80s-35.8-80-80-80H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H176c26.5 0 48 21.5 48 48s-21.5 48-48 48H112c-8.8 0-16 7.2-16 16s7.2 16 16 16z"/></svg>
                      <b> Windy Speed </b>{city?.wind?.speed}%
                    </p>
                  </div>
                  <hr className={styles.bgwhite} />
                </div>
                <div className={styles.bottom_bar}>
                  <h1 className={styles.sidebar_cityName}>
                    The next 5 days  
                  </h1> 
                  <ForecastedDays days={days} setCurrentDay={setCurrentDay}/>
                </div>
              </div>
            </div>
          </main>);

}