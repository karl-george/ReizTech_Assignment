import { ICountry } from '../../Interfaces';
import './countryCard.css';

interface Props {
  country: ICountry;
}

const CountryCard = ({ country }: Props) => {
  return (
    <div className='country-card'>
      <h2 className='country-card__title'>{country.name}</h2>
      <p className='country-card__region'>Region: {country.region}</p>
      <p className='country-card__size'>Size: {country.area}km²</p>
    </div>
  );
};

export default CountryCard;
