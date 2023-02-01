import { useState, useEffect, FC } from 'react';
import { ICountry } from './Interfaces';
import CountryCard from './Components/CountryCard/CountryCard';
import './App.css';
import Pagination from './Components/Pagination/Pagination';

const App: FC = () => {
  const [countryData, setCountryData] = useState<ICountry[]>();
  const [filteredData, setFilteredData] = useState<ICountry[]>();
  const [chosenFilter, setChosenFilter] = useState<string>();
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countriesPerPage, setCountriesPerPage] = useState<number>(15);

  useEffect(() => {
    fetch(`https://restcountries.com/v2/all?fields=name,region,area`)
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
        setFilteredData(data);
      });
  }, []);

  const idxOfLastCountry = currentPage * countriesPerPage;
  const idxOfFirstCountry = idxOfLastCountry - countriesPerPage;
  const currentCountries = filteredData?.slice(
    idxOfFirstCountry,
    idxOfLastCountry
  );
  const numberOfPages =
    Math.ceil(filteredData?.length / countriesPerPage) || [];

  const sort = (dir: string): void => {
    if (dir === 'asc') {
      const sortedFilter: ICountry[] = [...(filteredData as ICountry[])].sort(
        (a, b) => a.name.localeCompare(b.name)
      );
      setFilteredData(sortedFilter);
    } else if (dir === 'desc') {
      const sortedFilter: ICountry[] = [...(filteredData as ICountry[])].sort(
        (a, b) => -1 * a.name.localeCompare(b.name)
      );
      setFilteredData(sortedFilter);
    }
  };

  const filter = (): void => {
    if (chosenFilter === 'smallLith') {
      const LITHUANIA = countryData?.find((item) => item.name === 'Lithuania');

      if (LITHUANIA) {
        const filter = [...(countryData as ICountry[])].filter(
          (country) => country.area < LITHUANIA.area
        );
        setFilteredData(filter);
      }
    } else if (chosenFilter === 'withinOceania') {
      const REGION = 'Oceania';

      const filter = [...(countryData as ICountry[])].filter(
        (country) => country.region === REGION
      );
      setFilteredData(filter);
    }
  };

  const reset = (): void => {
    setFilteredData(countryData);
    setChosenFilter(undefined);
  };

  const toggle = (): void => {
    setIsToggled(!isToggled);
  };

  const filteredCountriesList = filteredData?.map(
    (country: ICountry, idx: number) => (
      <CountryCard key={idx} country={country} />
    )
  );

  const currentCountriesList = currentCountries?.map(
    (country: ICountry, idx: number) => (
      <CountryCard key={idx} country={country} />
    )
  );

  return (
    <div className='App'>
      <div className='container'>
        <h1 className='title'>CountryList</h1>
        <div className='btn-wrapper'>
          <div className='btn-group'>
            <button className='btn btn-color' onClick={() => sort('asc')}>
              Sort ↑
            </button>
            <button className='btn btn-color' onClick={() => sort('desc')}>
              Sort ↓
            </button>
          </div>
          <button className='btn btn-color' onClick={toggle}>
            Filter
          </button>
        </div>

        {isToggled && (
          <fieldset className='filter-group'>
            <div className='control'>
              <input
                type='radio'
                value='smallerThanLith'
                name='filter'
                id='smallLith'
                onChange={() => setChosenFilter('smallLith')}
                checked={chosenFilter === 'smallLith'}
              />
              <label className='filter-label' htmlFor='smallLith'>
                Countries smaller than Lithuania
              </label>
            </div>
            <div className='control'>
              <input
                type='radio'
                value='withinOceania'
                name='filter'
                id='withinOceania'
                onChange={() => setChosenFilter('withinOceania')}
                checked={chosenFilter === 'withinOceania'}
              />
              <label htmlFor='withinOceania'>Countries in Oceania</label>
            </div>
            <div className='filter-btn-group'>
              <button className='btn btn-small btn-color' onClick={filter}>
                Apply
              </button>
              <button className='btn btn-small btn-color' onClick={reset}>
                Reset
              </button>
            </div>
          </fieldset>
        )}
        {currentCountriesList}
        <Pagination
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default App;
