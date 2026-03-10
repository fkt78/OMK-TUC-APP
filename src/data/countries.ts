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
        usd: { name: 'US Dollar', symbol: '$', toBase: (v: number) => v, fromBase: (v: number) => v }
      },
      distance: {
        mile: { name: 'Mile', symbol: 'mi', toBase: (v: number) => v * 1609.344, fromBase: (v: number) => v / 1609.344 },
        foot: { name: 'Foot', symbol: 'ft', toBase: (v: number) => v * 0.3048, fromBase: (v: number) => v / 0.3048 },
        yard: { name: 'Yard', symbol: 'yd', toBase: (v: number) => v * 0.9144, fromBase: (v: number) => v / 0.9144 }
      },
      weight: {
        pound: { name: 'Pound', symbol: 'lbs', toBase: (v: number) => v * 0.45359237, fromBase: (v: number) => v / 0.45359237 },
        ounce: { name: 'Ounce', symbol: 'oz', toBase: (v: number) => v * 0.028349523125, fromBase: (v: number) => v / 0.028349523125 }
      },
      temperature: {
        fahrenheit: { name: 'Fahrenheit', symbol: '°F', toBase: (v: number) => (v - 32) * 5/9, fromBase: (v: number) => v * 9/5 + 32 }
      },
      volume: {
        // 1 US gallon = 3.785411784 L（29 gal → 109.78 L）
        gallon: { name: 'Gallon (US)', symbol: 'gal', toBase: (v: number) => v * 3.785411784, fromBase: (v: number) => v / 3.785411784 }
      },
      speed: {
        milePerHour: { name: 'Miles Per Hour', symbol: 'mph', toBase: (v: number) => v * 1.609344, fromBase: (v: number) => v / 1.609344 }
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
        krw: { name: 'Korean Won', symbol: '₩', toBase: (v: number) => v, fromBase: (v: number) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v: number) => v, fromBase: (v: number) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v: number) => v, fromBase: (v: number) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v: number) => v, fromBase: (v: number) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v: number) => v, fromBase: (v: number) => v } }
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
        vnd: { name: 'Vietnamese Dong', symbol: '₫', toBase: (v: number) => v, fromBase: (v: number) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v: number) => v, fromBase: (v: number) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v: number) => v, fromBase: (v: number) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v: number) => v, fromBase: (v: number) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v: number) => v, fromBase: (v: number) => v } }
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
        thb: { name: 'Thai Baht', symbol: '฿', toBase: (v: number) => v, fromBase: (v: number) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v: number) => v, fromBase: (v: number) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v: number) => v, fromBase: (v: number) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v: number) => v, fromBase: (v: number) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v: number) => v, fromBase: (v: number) => v } }
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
        twd: { name: 'New Taiwan Dollar', symbol: 'NT$', toBase: (v: number) => v, fromBase: (v: number) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v: number) => v, fromBase: (v: number) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v: number) => v, fromBase: (v: number) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v: number) => v, fromBase: (v: number) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v: number) => v, fromBase: (v: number) => v } }
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
        cny: { name: 'Chinese Yuan', symbol: '¥', toBase: (v: number) => v, fromBase: (v: number) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v: number) => v, fromBase: (v: number) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v: number) => v, fromBase: (v: number) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v: number) => v, fromBase: (v: number) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v: number) => v, fromBase: (v: number) => v } }
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
        aud: { name: 'Australian Dollar', symbol: 'A$', toBase: (v: number) => v, fromBase: (v: number) => v }
      },
      distance: { km: { name: 'キロメートル', symbol: 'km', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 } },
      weight: { kg: { name: 'キログラム', symbol: 'kg', toBase: (v: number) => v, fromBase: (v: number) => v } },
      temperature: { celsius: { name: 'Celsius', symbol: '°C', toBase: (v: number) => v, fromBase: (v: number) => v } },
      volume: { liter: { name: 'リットル', symbol: 'L', toBase: (v: number) => v, fromBase: (v: number) => v } },
      speed: { kmh: { name: 'km/h', symbol: 'km/h', toBase: (v: number) => v, fromBase: (v: number) => v } }
    }
  }
};

export const getCountries = () => Object.values(COUNTRIES);
export const getCountry = (id: string) => COUNTRIES[id];
