export function normalizeCityName(city: string): string {
  return city.trim().toLowerCase().replace(/\s+/g, ' ');
}
