import { useState, useEffect, FC } from 'react';
import { ICountry } from './Interfaces';
import CountryCard from './Components/CountryCard/CountryCard';
import './App.css';

const App: FC = () => {
  const [countryData, setCountryData] = useState<ICountry[]>();
  const [filtered, setFiltered] = useState<ICountry[]>();
  const [isChosen, setIsChosen] = useState<string>();

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

      if (filtered) {
        const sortedFilter: ICountry[] = [...(filtered as ICountry[])].sort(
          (a, b) => a.name.localeCompare(b.name)
        );
        setFiltered(sortedFilter);
      }
    } else if (dir === 'desc') {
      const sortDesc: ICountry[] = [...(countryData as ICountry[])].sort(
        (a, b) => -1 * a.name.localeCompare(b.name)
      );
      setCountryData(sortDesc);

      if (filtered) {
        const sortedFilter: ICountry[] = [...(filtered as ICountry[])].sort(
          (a, b) => -1 * a.name.localeCompare(b.name)
        );
        setFiltered(sortedFilter);
      }
    }
  };

  const filter = (): void => {
    if (isChosen === 'smallLith') {
      const LITHUANIA = countryData?.find((item) => item.name === 'Lithuania');

      if (LITHUANIA) {
        const filter = [...(countryData as ICountry[])].filter(
          (country) => country.area < LITHUANIA.area
        );
        setFiltered(filter);
      }
    } else if (isChosen === 'withinOceania') {
      const REGION = 'Oceania';

      const filter = [...(countryData as ICountry[])].filter(
        (country) => country.region === REGION
      );
      setFiltered(filter);
    }
  };

  const reset = (): void => {
    setFiltered(undefined);
    setIsChosen(undefined);
  };

  const countries = countryData?.map((country: ICountry, idx: number) => (
    <CountryCard key={idx} country={country} />
  ));

  const filteredCountries = filtered?.map((country: ICountry, idx: number) => (
    <CountryCard key={idx} country={country} />
  ));

  return (
    <div className='App'>
      <button onClick={() => sort('asc')}>Ascending</button>
      <button onClick={() => sort('desc')}>Descending</button>
      <button>Filter</button>
      <button onClick={filter}>Apply</button>
      <button onClick={reset}>Reset</button>

      <fieldset>
        <legend>Please Choose Filter</legend>
        <div>
          <input
            type='radio'
            value='smallerThanLith'
            name='filter'
            id='smallLith'
            onChange={() => setIsChosen('smallLith')}
            checked={isChosen === 'smallLith'}
          />
          <label htmlFor='smallLith'>Countries smaller than Lithuania</label>
        </div>
        <div>
          <input
            type='radio'
            value='withinOceania'
            name='filter'
            id='withinOceania'
            onChange={() => setIsChosen('withinOceania')}
            checked={isChosen === 'withinOceania'}
          />
          <label htmlFor='withinOceania'>Countries in Oceania</label>
        </div>
      </fieldset>

      {filteredCountries ? filteredCountries : countries}
    </div>
  );
};

export default App;
