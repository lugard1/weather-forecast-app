import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCounties } from '../../redux/countries/countries';

import Country from './Country';
import classes from './Countries.module.css';

const Countries = () => {
  const [currentRegion, setCurrentRegion] = useState('Africa');

  const data = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const { region, countries } = data;

  const regionChangeHandler = (event) => {
    setCurrentRegion(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchCounties(currentRegion));
  }, [dispatch, currentRegion]);

  return (
    <div className={classes.container}>
      <div className={classes.region_option}>
        <p>Filter by Region</p>
        <select value={currentRegion} onChange={regionChangeHandler}>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className={classes.region}>
        <div className={classes.region_map}>
          <img src={region.regionMap} alt={region.name} />
        </div>
        <div className={classes.region_info}>
          <h2>{region.name}</h2>
          <span>{`Countries: (${region.totalCountries})`}</span>
          <span>{`Population: (${region.totalPopulation})`}</span>
        </div>
      </div>
      <ul className={classes.countries}>
        {countries.map((country) => (
          <Country
            key={country.id}
            name={country.name}
            capital={country.capital || country.name}
            population={country.population}
            cc={country.cc}
            flag={country.flag}
            map={country.map}
          />
        ))}
      </ul>
    </div>
  );
};

export default Countries;
