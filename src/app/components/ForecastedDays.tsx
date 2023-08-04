import { use, useEffect,useState } from 'react';
import styles from '../page.module.css';
import { DAYS, getTemperatureAsCelsius} from '../services/weather.service';
import Image from 'next/image';



export function ForecastedDays({days, setCurrentDay}: any) {

    useEffect(
        () => {
            console.log("days: ", days);
        }
    , [days]
    )

    return (<>
        {days?.length > 0 && days.map((day:any)=>
        <div className={styles.forecastedDayItem} key={day?.date} onMouseOver={()=>setCurrentDay(day)}>
            <span><Image src={`https://openweathermap.org/img/wn/${day?.times[0].data.icon}@2x.png`} alt={''} width={32} height={32}/></span>
            <div className={styles.daySection}>
                <span>
                    {DAYS[new Date(day?.date).getDay()]} 
                </span>
                <span>{getTemperatureAsCelsius(day?.times[0].data.temp)}°C  / { getTemperatureAsCelsius(day?.times[0].data.temp)}°C </span>
            </div>
        </div>)}
    </>);
}

