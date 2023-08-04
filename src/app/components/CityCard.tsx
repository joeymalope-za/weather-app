import styles from '../page.module.css';
import { getTemperatureAsCelsius} from '../services/weather.service';
import Image from 'next/image';

export const CityCard = ({city}: any) => {
    return (
        <div 
        onClick={() => {
          console.log("city",city);
        }}
        key={city?.name}
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h1 className={styles.temp}>
            {getTemperatureAsCelsius(city?.main.temp)}°C <br/>
          </h1>
          <p>{city?.dt_txt}</p>
          <h2>
            {city?.name} <br/>
          </h2>
          <p>
            {city?.coord?.lat}, {city?.coord?.lon}
          </p>
          <p>{city?.weather[0].main}, {city?.weather[0].description}</p>
          <span><Image src={`https://openweathermap.org/img/wn/${city?.weather[0].icon}@2x.png`} alt={''} width={32} height={32}/></span>
        </div>
    )
};