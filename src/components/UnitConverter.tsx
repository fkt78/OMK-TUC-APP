import React, { useState, useEffect } from 'react';
import type { Country, UnitCategory } from '../types/index';
import { convertCurrency } from '../services/exchangeRateService';

const JAPANESE_UNITS: { [key in UnitCategory]: { name: string; symbol: string } } = {
  currency: { name: '日本円', symbol: '¥' },
  distance: { name: 'メートル', symbol: 'm' },
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

const UnitConverter: React.FC<Props> = ({ country, category, exchangeRates: _exchangeRates, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [direction, setDirection] = useState<'toJp' | 'fromJp'>('toJp');
  const units = country.units[category];

  const unitKeys = units ? Object.keys(units) : [];
  const [selectedUnit, setSelectedUnit] = useState('');
  const safeSelectedUnit = selectedUnit && units?.[selectedUnit] ? selectedUnit : unitKeys[0] ?? '';

  useEffect(() => {
    if (unitKeys.length > 0) {
      setSelectedUnit(unitKeys[0]);
    }
  }, [country.id, category]);

  useEffect(() => {
    if (!units || unitKeys.length === 0) return;

    const performConversion = async () => {
      if (!inputValue || inputValue.trim() === '' || isNaN(Number(inputValue))) {
        setResult(null);
        return;
      }

      const num = Number(inputValue);
      const unit = safeSelectedUnit || unitKeys[0];
      const unitData = unit ? units[unit] : null;

      if (!unitData) return;

      if (category === 'currency') {
        if (direction === 'toJp') {
          const converted = await convertCurrency(num, unit.toUpperCase(), 'JPY');
          setResult(converted);
        } else {
          const converted = await convertCurrency(num, 'JPY', unit.toUpperCase());
          setResult(converted);
        }
      } else {
        if (direction === 'toJp') {
          const baseValue = unitData.toBase(num);
          setResult(baseValue);
        } else {
          const baseValue = num;
          setResult(unitData.fromBase(baseValue));
        }
      }
    };

    performConversion();
  }, [inputValue, safeSelectedUnit, unitKeys, direction, category, units]);

  if (!units || unitKeys.length === 0) {
    return <div className="converter-error">この項目に対応する単位がありません</div>;
  }

  const jpUnit = JAPANESE_UNITS[category];

  const formatResult = (value: number) => {
    if (category === 'currency') {
      return value.toLocaleString('ja-JP', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (category === 'temperature') {
      return value.toFixed(1);
    }
    if (Math.abs(value) >= 1000 || (Math.abs(value) < 0.01 && value !== 0)) {
      return value.toLocaleString('ja-JP', { maximumFractionDigits: 2 });
    }
    return value.toLocaleString('ja-JP', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const isToJp = direction === 'toJp';

  return (
    <div className="converter-container">
      <div className="converter-direction">
        <button
          type="button"
          className={`converter-direction-btn ${isToJp ? 'active' : ''}`}
          onClick={() => setDirection('toJp')}
        >
          現地 → 日本
        </button>
        <button
          type="button"
          className={`converter-direction-btn ${!isToJp ? 'active' : ''}`}
          onClick={() => setDirection('fromJp')}
        >
          日本 → 現地
        </button>
      </div>

      <div className="converter-form">
        <div className="input-group">
          <input
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={(e) => {
              const v = e.target.value;
              if (v === '' || /^-?\d*\.?\d*$/.test(v)) setInputValue(v);
            }}
            placeholder="数値を入力"
            className="converter-input"
          />
          {isToJp ? (
            <select
              value={safeSelectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="converter-select"
            >
              {unitKeys.map((key) => (
                <option key={key} value={key}>
                  {units[key].name} ({units[key].symbol})
                </option>
              ))}
            </select>
          ) : (
            <div className="converter-fixed-unit">
              {jpUnit.name} ({jpUnit.symbol})
            </div>
          )}
        </div>

        <div className="converter-arrow" aria-hidden="true">→</div>

        <div className="output-group">
          <div className="converter-output">
            {loading ? (
              <span>読込中...</span>
            ) : result !== null ? (
              <span>
                {formatResult(result)}{' '}
                {isToJp ? jpUnit.symbol : (units[safeSelectedUnit]?.symbol ?? '-')}
              </span>
            ) : (
              <span>-</span>
            )}
          </div>
          {isToJp ? (
            <div className="converter-fixed-unit">
              {jpUnit.name} ({jpUnit.symbol})
            </div>
          ) : (
            <select
              value={safeSelectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="converter-select"
            >
              {unitKeys.map((key) => (
                <option key={key} value={key}>
                  {units[key].name} ({units[key].symbol})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
