import { zipData } from '../data/index';
import { normalizeCityName } from './normalize';

export const validateZip = (zip: string): boolean => {
  if (/\s/.test(zip)) {
    return false;
  }
  return /^\d{5}$/.test(zip) && !!zipData[zip];
};

export const getCityByZip = (zip: string): string | null => {
  const cleanZip = zip.replace(/\s/g, '');
  return zipData[cleanZip] || null;
};

export const getZipByCity = (
  city: string,
  options?: { limit?: number },
): string[] => {
  const normCity = normalizeCityName(city);

  const results = Object.entries(zipData).reduce(
    (acc: string[], [zip, name]) => {
      const normalizedName = normalizeCityName(name);
      if (normalizedName?.includes(normCity)) {
        acc.push(zip);
      }
      return acc;
    },
    [],
  );

  return options?.limit ? results.slice(0, options.limit) : results;
};
