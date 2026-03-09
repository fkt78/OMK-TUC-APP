import type { ExchangeRateCache } from '../types/index';

const CACHE_KEY = 'exchange_rates_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const API_URL = 'https://api.exchangerate.host/latest';

const getCachedRates = (): ExchangeRateCache | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const data = JSON.parse(cached) as ExchangeRateCache;
    if (Date.now() - data.timestamp < CACHE_DURATION) return data;
    return null;
  } catch {
    return null;
  }
};

const setCachedRates = (rates: { [key: string]: number }) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), rates }));
  } catch {
    console.error('Failed to cache');
  }
};

const fetchRatesFromAPI = async (baseCurrency: string) => {
  try {
    const response = await fetch(`${API_URL}?base=${baseCurrency}`);
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    return data.rates || null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export interface ExchangeRatesResult {
  rates: { [key: string]: number };
  updatedAt: number | null;
}

export const getExchangeRates = async (baseCurrency: string = 'JPY'): Promise<ExchangeRatesResult> => {
  const cached = getCachedRates();
  if (cached) return { rates: cached.rates, updatedAt: cached.timestamp };

  const rates = await fetchRatesFromAPI(baseCurrency);
  if (rates) {
    setCachedRates(rates);
    return { rates, updatedAt: Date.now() };
  }

  return { rates: getDefaultRates(), updatedAt: null };
};

// 1 JPY = X 各通貨（API失敗時のフォールバック、概算値）
const getDefaultRates = () => ({
  'USD': 0.0067,
  'KRW': 9.4,
  'VND': 155,
  'THB': 0.24,
  'TWD': 0.21,
  'CNY': 0.048,
  'AUD': 0.010,
  'JPY': 1
});

export const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string): Promise<number> => {
  if (fromCurrency === toCurrency) return amount;
  const { rates } = await getExchangeRates('JPY');
  const amountInJPY = amount / (rates[fromCurrency] || 1);
  return amountInJPY * (rates[toCurrency] || 1);
};

export const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    console.error('Failed');
  }
};
