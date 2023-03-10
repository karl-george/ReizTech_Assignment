import { useState, useEffect, FC } from 'react';
import { ICountry } from './Interfaces';
import CountryCard from './Components/CountryCard/CountryCard';
import Pagination from './Components/Pagination/Pagination';
import './App.css';

const App: FC = () => {
  const [countryData, setCountryData] = useState<ICountry[]>([]);
  const [filteredData, setFilteredData] = useState<ICountry[]>([]);
  const [checkLithFilter, setCheckLithFilter] = useState<boolean>(false);
  const [checkOceFilter, setCheckOceFilter] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countriesPerPage, setCountriesPerPage] = useState<number>(10);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v2/all?fields=name,region,area`)
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('Sorry, something went wrong!');
        }
      });
  }, []);

  // Pagination control
  const idxOfLastCountry = currentPage * countriesPerPage;
  const idxOfFirstCountry = idxOfLastCountry - countriesPerPage;
  const currentCountries = filteredData?.slice(
    idxOfFirstCountry,
    idxOfLastCountry
  );
  const numberOfPages = Math.ceil(filteredData.length / countriesPerPage);

  // Alphabetical sort
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

  // Filter data depending on chosen checkboxes
  const filter = (): void => {
    const LITHUANIA = countryData?.find((item) => item.name === 'Lithuania');
    const REGION = 'Oceania';

    if (checkLithFilter && checkOceFilter) {
      if (LITHUANIA) {
        const filteredLith = [...(countryData as ICountry[])].filter(
          (country) => country.area < LITHUANIA.area
        );
        const filteredOce = [...(filteredLith as ICountry[])].filter(
          (country) => country.region === REGION
        );

        setFilteredData(filteredOce);
        setCurrentPage(1);
      }
    } else if (checkLithFilter && !checkOceFilter) {
      if (LITHUANIA) {
        const filter = [...(countryData as ICountry[])].filter(
          (country) => country.area < LITHUANIA.area
        );
        setFilteredData(filter);
        setCurrentPage(1);
      }
    } else if (!checkLithFilter && checkOceFilter) {
      const filter = [...(countryData as ICountry[])].filter(
        (country) => country.region === REGION
      );
      setFilteredData(filter);
      setCurrentPage(1);
    } else if (!checkLithFilter && !checkOceFilter) {
      setFilteredData(countryData);
      setCurrentPage(1);
    }
  };

  // Reset everything to default
  const reset = (): void => {
    setFilteredData(countryData);
    setCheckLithFilter(false);
    setCheckOceFilter(false);
    setCurrentPage(1);
  };

  // Toggle displaying filter choices
  const toggle = (): void => {
    setIsToggled(!isToggled);
  };

  // Render list for country data
  const currentCountriesList = currentCountries?.map(
    (country: ICountry, idx: number) => (
      <CountryCard key={idx} country={country} />
    )
  );

  // Handle error
  if (errorMessage) {
    return <h2 className='error'>{errorMessage}</h2>;
  }

  return (
    <div className='App'>
      {isLoading ? (
        <h2 className='loading'>Loading...</h2>
      ) : (
        <>
          <div className='container'>
            <h1 className='title'>Country Sizes and Regions</h1>
            <div className='btn-wrapper'>
              <div className='btn-group'>
                <button className='btn btn-color' onClick={() => sort('asc')}>
                  Sort ???
                </button>
                <button className='btn btn-color' onClick={() => sort('desc')}>
                  Sort ???
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
                    type='checkbox'
                    id='smallLith'
                    onChange={(e) => setCheckLithFilter(e.target.checked)}
                    checked={checkLithFilter}
                  />
                  <span className='checkmark'></span>
                  <label className='filter-label' htmlFor='smallLith'>
                    Countries smaller than Lithuania
                  </label>
                </div>
                <div className='control'>
                  <input
                    type='checkbox'
                    id='withinOceania'
                    onChange={(e) => setCheckOceFilter(e.target.checked)}
                    checked={checkOceFilter}
                  />
                  <span className='checkmark'></span>
                  <label className='filter-label' htmlFor='withinOceania'>
                    Countries in Oceania
                  </label>
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
          <footer>
            <div className='container'>
              <p className='footer-info'>Created by Karl George 2023</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
