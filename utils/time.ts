import { Era } from '../types';
import { ROMAN_NUMERALS } from '../constants';

// Converts a number to its Roman numeral representation
export function toRoman(num: number): string {
  return ROMAN_NUMERALS[num] || num.toString();
}

// Generates a random year between 2100 BC and 2100 AD, avoiding year 0.
export function generateRandomYear(): { year: number; era: Era } {
  const min = -2100;
  const max = 2100;
  let randomYear = 0;
  while (randomYear === 0) {
    randomYear = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return {
    year: Math.abs(randomYear),
    era: randomYear > 0 ? 'd.C.' : 'a.C.',
  };
}

// Generates a random century from I to XXI, a.C. or d.C.
export function generateRandomCentury(): { century: number; era: Era } {
  const century = Math.floor(Math.random() * 21) + 1;
  const era = Math.random() < 0.5 ? 'd.C.' : 'a.C.';
  return { century, era };
}

// Converts a year and era into the corresponding century number.
export function getCenturyFromYear(year: number, era: Era): number {
  if (era === 'd.C.') {
    // Years ending in '00' belong to the century they end, e.g., 1900 is 19th century.
    if (year % 100 === 0) {
      return year / 100;
    }
    // Otherwise, it's the next century. E.g., 1901 is 20th century.
    return Math.floor(year / 100) + 1;
  } else { // a.C.
    // E.g., year 45 BC is 1st century BC. year 200 BC is 2nd century BC.
    return Math.ceil(year / 100);
  }
}

// Gets the start and end years for a given century and era.
export function getYearRangeForCentury(century: number, era: Era): { start: number; end: number } {
  if (era === 'd.C.') {
    const start = (century - 1) * 100 + 1;
    const end = century * 100;
    return { start, end };
  } else { // a.C.
    const start = century * 100;
    const end = (century - 1) * 100 + 1;
    return { start, end };
  }
}

// Checks if a given year falls within a given century.
export function isYearInCentury(year: number, century: number, era: Era): boolean {
  const range = getYearRangeForCentury(century, era);
  if (era === 'd.C.') {
      return year >= range.start && year <= range.end;
  } else { // a.C.
      return year >= range.end && year <= range.start;
  }
}