import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  TbTemperature,
  TbTemperatureMinus,
  TbTemperaturePlus,
} from 'react-icons/tb';
import { GiPressureCooker } from 'react-icons/gi';
import { WiHumidity } from 'react-icons/wi';
import { FaWind, FaCloud } from 'react-icons/fa';
import { fetchWeather } from '../../redux/weather/weather';
import classes from './Details.module.css';

const Details = () => {
  const weather = useSelector((state) => state.weather.weather);
  const countries = useSelector((state) => state.countries.countries);
  const dispatch = useDispatch();
  const { cc } = useParams();
  const country = countries.find(
    (country) => country.cc.toLocaleLowerCase() === cc.toLocaleLowerCase(),
  );

  useEffect(() => {
    if (country) {
      dispatch(fetchWeather({ lat: country.lat, lon: country.lon }));
    }
  }, [dispatch, country]);

  let weatherContent = (
    <p className={classes.no_content}>
      No data found! Please go back to
      {' '}
      <Link to="/">Home</Link>
    </p>
  );
  if (country && weather.name) {
    weatherContent = (
      <>
        <div className={classes.map}>
          <img src={country.map} alt={country.name} />
        </div>
        <div className={classes.weather}>
          <h2>{weather.name}</h2>
          <img src={weather.icon} alt={weather.name} />
          <p>{weather.description}</p>
          <ul className={classes.weather_info}>
            <li className={classes.weather_item}>
              <span>
                <TbTemperature />
                {' '}
                Temperature:
              </span>
              <span>
                {weather.temp}
                &#8451;
              </span>
            </li>
            <li className={classes.weather_item}>
              <span>
                <TbTemperature />
                {' '}
                Feels Like:
              </span>
              <span>
                {weather.feels_like}
                &#8451;
              </span>
            </li>
            <li className={classes.weather_item}>
              <span>
                <TbTemperatureMinus />
                {' '}
                Min Temperature:
              </span>
              <span>
                {weather.temp_min}
                &#8451;
              </span>
            </li>
            <li className={classes.weather_item}>
              <span>
                <TbTemperaturePlus />
                {' '}
                Max Temperature:
              </span>
              <span>
                {weather.temp_max}
              </span>
            </li>
            <li className={classes.weather_item}>
              <span>
                <GiPressureCooker />
                {' '}
                Pressure:
              </span>
              <span>
                {weather.pressure}
                &#13169;
              </span>
            </li>
            <li className={classes.weather_item}>
              <span>
                <WiHumidity />
                {' '}
                Humidity:
              </span>
              <span>
                {weather.humidity}
                {' '}
                %
              </span>
            </li>
            <li className={classes.weather_item}>
              <span>
                <FaWind />
                {' '}
                Wind Speed:
              </span>
              <span>
                {weather.wind_speed}
                {' '}
                meter/sec
              </span>
            </li>
            <li className={classes.weather_item}>
              <span>
                <FaCloud />
                {' '}
                Cloud Cover:
              </span>
              <span>
                {weather.cloud}
                {' '}
                %
              </span>
            </li>
          </ul>
        </div>
      </>
    );
  }

  return <div className={classes.container}>{weatherContent}</div>;
};

export default Details;
