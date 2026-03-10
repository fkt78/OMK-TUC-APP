import React from 'react';
import type { Country, UnitCategory } from '../types/index';
import UnitConverter from './UnitConverter';

const CATEGORY_LABELS: Record<UnitCategory, string> = {
  currency: '通貨',
  distance: '距離',
  weight: '重さ',
  temperature: '温度',
  length: '長さ',
  speed: '速さ',
  volume: '容量'
};

interface Props {
  stepId: string;
  country: Country;
  category: UnitCategory;
  availableCategories: UnitCategory[];
  exchangeRates: { [key: string]: number };
  loading: boolean;
  onCategoryChange: (category: UnitCategory) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const ConversionStepBlock: React.FC<Props> = ({
  stepId,
  country,
  category,
  availableCategories,
  exchangeRates,
  loading,
  onCategoryChange,
  onRemove,
  canRemove
}) => {
  return (
    <div className="conversion-step-block">
      <div className="conversion-step-header">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as UnitCategory)}
          className="conversion-step-category-select"
        >
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
        {canRemove && (
          <button
            type="button"
            className="conversion-step-remove"
            onClick={onRemove}
            aria-label="この変換を削除"
          >
            削除
          </button>
        )}
      </div>
      <UnitConverter
        key={`${stepId}-${category}`}
        country={country}
        category={category}
        exchangeRates={exchangeRates}
        loading={loading}
      />
    </div>
  );
};

export default ConversionStepBlock;
