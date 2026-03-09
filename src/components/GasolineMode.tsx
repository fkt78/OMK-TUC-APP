import React, { useState, useEffect } from 'react';
import type { Country } from '../types/index';
import { convertCurrency } from '../services/exchangeRateService';

const US_GALLON_TO_LITER = 3.78541;

interface Props {
  country: Country;
  loading: boolean;
}

const GasolineMode: React.FC<Props> = ({ country, loading }) => {
  const [priceInput, setPriceInput] = useState('');
  const [resultYenPerL, setResultYenPerL] = useState<number | null>(null);

  const isUSA = country.id === 'usa';

  useEffect(() => {
    const calculate = async () => {
      const num = Number(priceInput);
      if (!priceInput || isNaN(num) || num <= 0) {
        setResultYenPerL(null);
        return;
      }

      if (isUSA) {
        const usdPerLiter = num / US_GALLON_TO_LITER;
        const yenPerLiter = await convertCurrency(usdPerLiter, 'USD', 'JPY');
        setResultYenPerL(yenPerLiter);
      } else {
        const yenPerLiter = await convertCurrency(num, country.currencyCode, 'JPY');
        setResultYenPerL(yenPerLiter);
      }
    };

    calculate();
  }, [priceInput, country.id, country.currencyCode, isUSA]);

  return (
    <div className="gasoline-mode">
      <h2>ガソリン代</h2>
      <div className="gasoline-mode-form">
        {isUSA ? (
          <>
            <label className="gasoline-mode-label">
              1ガロンあたり
              <input
                type="number"
                inputMode="decimal"
                step="0.001"
                min="0"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder="4.399"
                className="gasoline-mode-input"
              />
              ドル
            </label>
          </>
        ) : (
          <>
            <label className="gasoline-mode-label">
              1リットルあたり
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder="例: 1500"
                className="gasoline-mode-input"
              />
              {country.currencySymbol}（{country.currencyCode}）
            </label>
          </>
        )}

        <div className="gasoline-mode-result">
          {loading ? (
            <span className="gasoline-mode-loading">読込中...</span>
          ) : resultYenPerL !== null ? (
            <span>
              → 1リットルあたり 約{' '}
              {Math.round(resultYenPerL).toLocaleString('ja-JP')} 円
            </span>
          ) : (
            <span className="gasoline-mode-placeholder">-</span>
          )}
        </div>
      </div>
      {isUSA && (
        <p className="gasoline-mode-hint">
          看板の「439 9/10」は 4.399 と入力してください
        </p>
      )}
    </div>
  );
};

export default GasolineMode;
