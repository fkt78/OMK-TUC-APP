import React from 'react';
import type { Country } from '../types/index';

interface Props {
  countries: Country[];
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
}

const CountrySelector: React.FC<Props> = ({ countries, selectedCountry, onSelectCountry }) => {
  return (
    <div className="country-selector">
      <h2>旅行先を選択</h2>
      <div className="country-grid">
        {countries.map((country) => (
          <button
            key={country.id}
            className={`country-card ${selectedCountry?.id === country.id ? 'active' : ''}`}
            onClick={() => onSelectCountry(country)}
          >
            <div className="country-name">{country.nameJa}</div>
            <div className="currency-info">{country.currencyCode}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountrySelector;
