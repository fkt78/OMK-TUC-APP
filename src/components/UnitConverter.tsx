import React, { useState, useEffect } from 'react';
import type { Country, UnitCategory } from '../types/index';
import { convertCurrency } from '../services/exchangeRateService';

const JAPANESE_UNITS: { [key in UnitCategory]: { name: string; symbol: string } } = {
  currency: { name: '日本円', symbol: '¥' },
  distance: { name: 'キロメートル', symbol: 'km' },
  weight: { name: 'キログラム', symbol: 'kg' },
  temperature: { name: '摂氏', symbol: '°C' },
  length: { name: 'メートル', symbol: 'm' },
  speed: { name: 'km/h', symbol: 'km/h' },
  volume: { name: 'リットル', symbol: 'L' }
};

interface Props {
  country: Country;
  category: UnitCategory;
  exchangeRates: { [key: string]: number };
  loading: boolean;
}

const UnitConverter: React.FC<Props> = ({ country, category, exchangeRates, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const units = country.units[category];

  const unitKeys = units ? Object.keys(units) : [];
  const [fromUnit, setFromUnit] = useState('');

  useEffect(() => {
    if (unitKeys.length > 0) {
      setFromUnit(unitKeys[0]);
    }
  }, [country.id, category]);

  if (!units || unitKeys.length === 0) {
    return <div className="converter-error">この項目に対応する単位がありません</div>;
  }

  const jpUnit = JAPANESE_UNITS[category];

  useEffect(() => {
    const performConversion = async () => {
      if (!inputValue || isNaN(Number(inputValue))) {
        setResult(null);
        return;
      }

      const num = Number(inputValue);
      const fromUnitData = units[fromUnit];

      if (!fromUnitData) return;

      if (category === 'currency') {
        const converted = await convertCurrency(num, fromUnit.toUpperCase(), 'JPY');
        setResult(converted);
      } else {
        const baseValue = fromUnitData.toBase(num);
        setResult(baseValue);
      }
    };

    performConversion();
  }, [inputValue, fromUnit, category, units]);

  const formatResult = (value: number) => {
    if (category === 'currency' || category === 'temperature') return value.toFixed(2);
    if (value >= 1000 || (value < 0.01 && value > 0)) return value.toExponential(2);
    return value.toFixed(2);
  };

  return (
    <div className="converter-container">
      <div className="converter-form">
        <div className="input-group">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="数値を入力"
            className="converter-input"
          />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="converter-select">
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {units[key].name} ({units[key].symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="converter-arrow">→</div>

        <div className="output-group">
          <div className="converter-output">
            {loading ? (
              <span>読込中...</span>
            ) : result !== null ? (
              <span>{formatResult(result)} {jpUnit.symbol}</span>
            ) : (
              <span>-</span>
            )}
          </div>
          <div className="converter-fixed-unit">{jpUnit.name} ({jpUnit.symbol})</div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
