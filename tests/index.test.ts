import { describe, it, expect } from 'vitest';
import { validateZip, getCityByZip, getZipByCity } from '../src/index';

describe('validateZip', () => {
  it('should return true for valid ZIP codes', () => {
    expect(validateZip('11000')).toBe(true);
    expect(validateZip(' 12000 ')).toBe(false);
  });

  it('should return false for invalid ZIP codes', () => {
    expect(validateZip('abcde')).toBe(false);
    expect(validateZip('123')).toBe(false);
    expect(validateZip('123456')).toBe(false);
  });
});

describe('getCityByZip', () => {
  it('should return the correct city for a valid ZIP code', () => {
    expect(getCityByZip('11000')).toBe('Praha 1');
    expect(getCityByZip('60200')).toBe('Brno 2');
  });

  it('should return null for an invalid ZIP code', () => {
    expect(getCityByZip('99999')).toBe(null);
  });
});

describe('getZipByCity', () => {
  it('should return all ZIP codes for a given city', () => {
    expect(getZipByCity('Jihlava')).toEqual(['58601', '58603']);
  });

  it('should return limited results if a limit is specified', () => {
    expect(getZipByCity('Brno', { limit: 1 })).toEqual(['60200']);
  });

  it('should return an empty array if no ZIP codes match the city', () => {
    expect(getZipByCity('Neexistující Město')).toEqual([]);
  });
});
