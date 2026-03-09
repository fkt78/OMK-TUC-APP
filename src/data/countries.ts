import type { Country } from '../types/index';

export const COUNTRIES: { [key: string]: Country } = {
  usa: {
    id: 'usa',
    name: 'United States',
    nameJa: 'アメリカ',
    currencyCode: 'USD',
    currencySymbol: '$',
    units: {
      currency: {
        usd: { name: 'US Dollar', symbol: '$', toBase: (v) => v, fromBase: (v) => v }
      },
      distance: {
        mile: { name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
        foot: { name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
        yard: { name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 }
      },
      weight: {
        pound: { name: 'Pound', symbol: 'lbs', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
        ounce: { name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 }
      },
      temperature: {
        fahrenheit: { name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 }
      },
      volume: {
        gallon: { name: 'Gallon (US)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 }
      },
      speed: {
        milePerHour: { name: 'Miles Per Hour', symbol: 'mph', toBase: (v) => v * 1.60934, fromBase: (v) => v / 1.60934 }
      }
    }
  },
  korea: {
    id: 'korea',
    name: 'South Korea',
    nameJa: '韓国',
    currencyCode: 'KRW',
    currencySymbol: '₩',
    units: {
      currency: {
        krw: { name: 'Korean Won', symbol: '₩', toBase: (v) => v, fromBase: (v) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v) => v, fromBase: (v) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v) => v, fromBase: (v) => v } }
    }
  },
  vietnam: {
    id: 'vietnam',
    name: 'Vietnam',
    nameJa: 'ベトナム',
    currencyCode: 'VND',
    currencySymbol: '₫',
    units: {
      currency: {
        vnd: { name: 'Vietnamese Dong', symbol: '₫', toBase: (v) => v, fromBase: (v) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v) => v, fromBase: (v) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v) => v, fromBase: (v) => v } }
    }
  },
  thailand: {
    id: 'thailand',
    name: 'Thailand',
    nameJa: 'タイ',
    currencyCode: 'THB',
    currencySymbol: '฿',
    units: {
      currency: {
        thb: { name: 'Thai Baht', symbol: '฿', toBase: (v) => v, fromBase: (v) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v) => v, fromBase: (v) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v) => v, fromBase: (v) => v } }
    }
  },
  taiwan: {
    id: 'taiwan',
    name: 'Taiwan',
    nameJa: '台湾',
    currencyCode: 'TWD',
    currencySymbol: 'NT$',
    units: {
      currency: {
        twd: { name: 'New Taiwan Dollar', symbol: 'NT$', toBase: (v) => v, fromBase: (v) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v) => v, fromBase: (v) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v) => v, fromBase: (v) => v } }
    }
  },
  china: {
    id: 'china',
    name: 'China',
    nameJa: '中国',
    currencyCode: 'CNY',
    currencySymbol: '¥',
    units: {
      currency: {
        cny: { name: 'Chinese Yuan', symbol: '¥', toBase: (v) => v, fromBase: (v) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v) => v, fromBase: (v) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v) => v, fromBase: (v) => v } }
    }
  },
  australia: {
    id: 'australia',
    name: 'Australia',
    nameJa: 'オーストラリア',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    units: {
      currency: {
        aud: { name: 'Australian Dollar', symbol: 'A$', toBase: (v) => v, fromBase: (v) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v) => v, fromBase: (v) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v) => v, fromBase: (v) => v } }
    }
  }
};

export const getCountries = () => Object.values(COUNTRIES);
export const getCountry = (id: string) => COUNTRIES[id];
