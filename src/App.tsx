import { useState, useEffect } from 'react';
import type { Country, UnitCategory } from './types/index';
import { getCountries } from './data/countries';
import { getExchangeRates } from './services/exchangeRateService';
import CountrySelector from './components/CountrySelector';
import UnitConverter from './components/UnitConverter';
import './App.css';

function App() {
  const [countries] = useState<Country[]>(getCountries());
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries[0] || null);
  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>('currency');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRates = async () => {
      setLoading(true);
      const rates = await getExchangeRates('JPY');
      setExchangeRates(rates);
      setLoading(false);
    };
    loadRates();
  }, []);

  const getAvailableCategories = (): UnitCategory[] => {
    if (!selectedCountry) return [];
    return Object.keys(selectedCountry.units) as UnitCategory[];
  };

  const availableCategories = getAvailableCategories();

  useEffect(() => {
    if (!availableCategories.includes(selectedCategory) && availableCategories.length > 0) {
      setSelectedCategory(availableCategories[0]);
    }
  }, [selectedCountry, availableCategories]);

  if (!selectedCountry) {
    return <div className="app-error">国データが見つかりません</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌍 Travel Unit Converter</h1>
        <p>海外旅行で使える単位変換アプリ</p>
      </header>

      <main className="app-main">
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />

        {availableCategories.length > 0 && (
          <div className="category-selector">
            <h2>変換項目を選択</h2>
            <div className="category-buttons">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && selectedCountry.units[selectedCategory] && (
          <UnitConverter
            country={selectedCountry}
            category={selectedCategory}
            exchangeRates={exchangeRates}
            loading={loading}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>為替レートは毎日1回更新されます | Made with ❤️ for travelers</p>
      </footer>
    </div>
  );
}

function getCategoryLabel(category: UnitCategory): string {
  const labels: { [key in UnitCategory]: string } = {
    currency: '💱 通貨',
    distance: '📏 距離',
    weight: '⚖️ 重さ',
    temperature: '🌡️ 温度',
    length: '📐 長さ',
    speed: '💨 速さ',
    volume: '🥛 容量'
  };
  return labels[category];
}

export default App;
