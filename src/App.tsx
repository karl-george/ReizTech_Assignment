import { useState, useEffect } from 'react';
import CountryCard from './Components/CountryCard/CountryCard';
import { ICountry } from './Interfaces';
import './App.css';

function App() {
  const [countryData, setCountryData] = useState();

  useEffect(() => {
    fetch(`https://restcountries.com/v2/all?fields=name,region,area`)
      .then((res) => res.json())
      .then((data) => setCountryData(data));
  }, []);

  const countries = countryData?.map((country: ICountry, idx: number) => (
    <CountryCard key={idx} country={country} />
  ));

  return <div className='App'>{countries}</div>;
}

export default App;
