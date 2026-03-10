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
  const units = country.units[category];
  const unitKeys = units ? Object.keys(units) : [];

  const [inputValue, setInputValue] = useState('');
  const [direction, setDirection] = useState<'toJp' | 'fromJp'>('toJp');
  const [selectedUnit, setSelectedUnit] = useState(unitKeys[0] ?? '');
  const [currencyResult, setCurrencyResult] = useState<number | null>(null);

  const safeUnit = selectedUnit && units?.[selectedUnit] ? selectedUnit : (unitKeys[0] ?? '');

  useEffect(() => {
    setInputValue('');
    setCurrencyResult(null);
    setSelectedUnit(unitKeys[0] ?? '');
  }, [country.id, category]);

  useEffect(() => {
    if (category !== 'currency') return;
    const trimmed = inputValue.trim();
    if (!trimmed || isNaN(Number(trimmed))) { setCurrencyResult(null); return; }
    const num = Number(trimmed);
    let cancelled = false;
    const convert = async () => {
      const converted = direction === 'toJp'
        ? await convertCurrency(num, safeUnit.toUpperCase(), 'JPY')
        : await convertCurrency(num, 'JPY', safeUnit.toUpperCase());
      if (!cancelled) setCurrencyResult(converted);
    };
    convert();
    return () => { cancelled = true; };
  }, [inputValue, safeUnit, direction, category]);

  if (!units || unitKeys.length === 0) {
    return <div className="converter-error">この項目に対応する単位がありません</div>;
  }

  // 通貨以外: state を介さず、render のたびに inputValue から直接計算する
  let result: number | null = null;
  if (category === 'currency') {
    result = currencyResult;
  } else {
    const trimmed = inputValue.trim();
    if (trimmed && !isNaN(Number(trimmed))) {
      const num = Number(trimmed);
      const unitData = units[safeUnit];
      if (unitData) {
        result = direction === 'toJp' ? unitData.toBase(num) : unitData.fromBase(num);
      }
    }
  }

  const jpUnit = JAPANESE_UNITS[category];
  const isToJp = direction === 'toJp';

  const formatResult = (value: number) => {
    if (category === 'currency') {
      return value.toLocaleString('ja-JP', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (category === 'temperature') return value.toFixed(1);
    if (Math.abs(value) >= 1000 || (Math.abs(value) < 0.01 && value !== 0)) {
      return value.toLocaleString('ja-JP', { maximumFractionDigits: 2 });
    }
    return value.toLocaleString('ja-JP', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

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
              value={safeUnit}
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
            {loading && category === 'currency' ? (
              <span>読込中...</span>
            ) : result !== null ? (
              <span>
                {formatResult(result)}{' '}
                {isToJp ? jpUnit.symbol : (units[safeUnit]?.symbol ?? '-')}
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
              value={safeUnit}
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
