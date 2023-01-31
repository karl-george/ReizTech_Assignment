import { ICountry } from '../../Interfaces';

const CountryCard = ({ country }) => {
  return (
    <div>
      {
        <div>
          <h2>{country.name}</h2>
          <p>Region: {country.region}</p>
          <p>Size: {country.area}</p>
        </div>
      }
    </div>
  );
};

export default CountryCard;
