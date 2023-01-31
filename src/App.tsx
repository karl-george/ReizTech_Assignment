import { useState, useEffect, FC } from 'react';
import CountryCard from './Components/CountryCard/CountryCard';
import { ICountry } from './Interfaces';
import './App.css';

const App: FC = () => {
  const [countryData, setCountryData] = useState<ICountry[]>();

  useEffect(() => {
    fetch(`https://restcountries.com/v2/all?fields=name,region,area`)
      .then((res) => res.json())
      .then((data) => setCountryData(data));
  }, []);

  const sort = (dir: string): void => {
    if (dir === 'asc') {
      const sortAsc: ICountry[] = [...(countryData as ICountry[])].sort(
        (a, b) => a.name.localeCompare(b.name)
      );
      setCountryData(sortAsc);
    } else if (dir === 'desc') {
      const sortDesc: ICountry[] = [...(countryData as ICountry[])].sort(
        (a, b) => -1 * a.name.localeCompare(b.name)
      );
      setCountryData(sortDesc);
    }
  };

  const countries = countryData?.map((country: ICountry, idx: number) => (
    <CountryCard key={idx} country={country} />
  ));

  return (
    <div className='App'>
      <button onClick={() => sort('asc')}>Ascending</button>
      <button onClick={() => sort('desc')}>Descending</button>

      {countries}
    </div>
  );
};

export default App;
