import type { ExchangeRateCache } from '../types/index';

const CACHE_KEY = 'exchange_rates_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const API_URL = 'https://open.er-api.com/v6/latest/JPY';

const getCachedRates = (): ExchangeRateCache | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const data = JSON.parse(cached) as ExchangeRateCache;
    if (Date.now() - data.timestamp < CACHE_DURATION) return data;
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
};

const setCachedRates = (rates: { [key: string]: number }) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), rates }));
  } catch {
    // ignore
  }
};

const fetchRatesFromAPI = async (): Promise<{ [key: string]: number } | null> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.result !== 'success' || !data.rates) return null;
    return data.rates;
  } catch {
    return null;
  }
};

export interface ExchangeRatesResult {
  rates: { [key: string]: number };
  updatedAt: number | null;
}

export const getExchangeRates = async (): Promise<ExchangeRatesResult> => {
  const cached = getCachedRates();
  if (cached) return { rates: cached.rates, updatedAt: cached.timestamp };

  const rates = await fetchRatesFromAPI();
  if (rates) {
    setCachedRates(rates);
    return { rates, updatedAt: Date.now() };
  }

  return { rates: getDefaultRates(), updatedAt: null };
};

// 1 JPY = X 各通貨（2026年3月時点の概算値、API失敗時のフォールバック）
const getDefaultRates = (): { [key: string]: number } => ({
  'JPY': 1,
  'USD': 0.006324,
  'KRW': 9.361,
  'VND': 163.36,
  'THB': 0.202,
  'TWD': 0.201,
  'CNY': 0.0438,
  'AUD': 0.00898,
});

// レートは「1 JPY = X 外貨」形式
// JPY → 外貨: amount * rates[外貨]
// 外貨 → JPY: amount / rates[外貨]
export const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string): Promise<number> => {
  if (fromCurrency === toCurrency) return amount;

  const { rates } = await getExchangeRates();
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];

  if (!fromRate || !toRate) return amount;

  const amountInJPY = fromCurrency === 'JPY' ? amount : amount / fromRate;
  const result = toCurrency === 'JPY' ? amountInJPY : amountInJPY * toRate;
  return result;
};

/** 1 fromCurrency = X toCurrency のレートを返す（表示用） */
export const getRateForDisplay = async (fromCurrency: string, toCurrency: string): Promise<number> => {
  return convertCurrency(1, fromCurrency, toCurrency);
};

export const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
};
