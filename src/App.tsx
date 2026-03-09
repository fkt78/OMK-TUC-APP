import { useState, useEffect, useCallback } from 'react';
import type { Country, UnitCategory } from './types/index';
import { getCountries } from './data/countries';
import { getExchangeRates } from './services/exchangeRateService';
import CountrySelector from './components/CountrySelector';
import ConversionStepBlock from './components/ConversionStepBlock';
import GasolineMode from './components/GasolineMode';
import LegalModal, { type LegalType } from './components/LegalModal';
import packageJson from '../package.json';
import './App.css';

interface ConversionStep {
  id: string;
  category: UnitCategory;
}

function generateStepId() {
  return `step-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function App() {
  const [countries] = useState<Country[]>(getCountries());
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries[0] || null);
  const [steps, setSteps] = useState<ConversionStep[]>([
    { id: generateStepId(), category: 'currency' }
  ]);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [ratesUpdatedAt, setRatesUpdatedAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [legalModal, setLegalModal] = useState<LegalType | null>(null);

  const getAvailableCategories = useCallback((): UnitCategory[] => {
    if (!selectedCountry) return [];
    return Object.keys(selectedCountry.units) as UnitCategory[];
  }, [selectedCountry]);

  const availableCategories = getAvailableCategories();

  useEffect(() => {
    const loadRates = async () => {
      setLoading(true);
      const { rates, updatedAt } = await getExchangeRates('JPY');
      setExchangeRates(rates);
      setRatesUpdatedAt(updatedAt);
      setLoading(false);
    };
    loadRates();
  }, []);

  useEffect(() => {
    setSteps((prev) =>
      prev.map((step) => {
        if (availableCategories.includes(step.category)) return step;
        return { ...step, category: availableCategories[0] || 'currency' };
      })
    );
  }, [selectedCountry?.id]);

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { id: generateStepId(), category: availableCategories[0] || 'currency' }
    ]);
  };

  const removeStep = (id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStepCategory = (id: string, category: UnitCategory) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, category } : s)));
  };

  if (!selectedCountry) {
    return <div className="app-error">国データが見つかりません</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Travel Unit Converter</h1>
        <p>海外旅行で使える単位変換アプリ</p>
      </header>

      <main className="app-main">
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />

        {availableCategories.length > 0 && (
          <div className="conversion-steps">
            <h2>変換</h2>
            {steps.map((step) => (
              <ConversionStepBlock
                key={step.id}
                stepId={step.id}
                country={selectedCountry}
                category={step.category}
                availableCategories={availableCategories}
                exchangeRates={exchangeRates}
                loading={loading}
                onCategoryChange={(category) => updateStepCategory(step.id, category)}
                onRemove={() => removeStep(step.id)}
                canRemove={steps.length > 1}
              />
            ))}
            <button type="button" className="conversion-add-btn" onClick={addStep}>
              + 変換を追加
            </button>
          </div>
        )}

        <GasolineMode country={selectedCountry} loading={loading} />
      </main>

      <footer className="app-footer">
        {ratesUpdatedAt !== null && (
          <p className="app-rates-updated">
            為替レート更新: {formatRatesDate(ratesUpdatedAt)}
          </p>
        )}
        {ratesUpdatedAt === null && !loading && (
          <p className="app-rates-updated">為替レート: オフライン（概算値）</p>
        )}
        <nav className="app-legal-links">
          <button type="button" onClick={() => setLegalModal('disclaimer')}>免責事項</button>
          <span className="app-legal-sep">|</span>
          <button type="button" onClick={() => setLegalModal('terms')}>利用規約</button>
          <span className="app-legal-sep">|</span>
          <button type="button" onClick={() => setLegalModal('privacy')}>プライバシーポリシー</button>
        </nav>
        <p className="app-version">v{packageJson.version}</p>
      </footer>

      {legalModal && (
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      )}
    </div>
  );
}

function formatRatesDate(timestamp: number): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${y}/${m}/${day} ${h}:${min}`;
}

export default App;
