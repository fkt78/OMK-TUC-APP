export type UnitCategory = 'currency' | 'distance' | 'weight' | 'temperature' | 'length' | 'speed' | 'volume';

export interface ConversionUnit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface UnitSet {
  [key: string]: ConversionUnit;
}

export type CountryUnits = {
  [K in UnitCategory]?: UnitSet;
};

export interface Country {
  id: string;
  name: string;
  nameJa: string;
  currencyCode: string;
  currencySymbol: string;
  units: CountryUnits;
}

export interface ExchangeRateCache {
  timestamp: number;
  rates: { [key: string]: number };
}

export interface ExchangeRateResponse {
  [key: string]: number;
}
