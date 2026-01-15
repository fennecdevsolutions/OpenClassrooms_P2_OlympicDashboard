export interface Participation {
id: number,
year: number,
city: string,
medalsCount: number,
athleteCount: number
}

export interface Olympic {
id: number,
country: string,
participations: Participation[]
}

export interface DashboardData {
  totalJOs: number;
  totalCountries: number;
  countries: string[];
  medalsPerCountry: number[];
}

export interface CountryData {
  totalEntries: number;
  totalMedals: number;
  totalAthletes: number;
  years: number[];
  medals: string[];
}
