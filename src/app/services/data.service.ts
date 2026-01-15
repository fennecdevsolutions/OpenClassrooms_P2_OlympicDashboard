import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Olympic, Participation, DashboardData, CountryData } from '../models/interfaces';
import { catchError, Observable, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http:HttpClient) { }


// dashboard data getter

public getDashboardData(): Observable<DashboardData> {
  return this.getRawData().pipe(
    map((data: Olympic[]) => {
          const totalJOs = Array.from(new Set(data.map((i: Olympic) => i.participations.map((f: Participation) => f.year)).flat())).length;
          const countries: string[] = data.map(i => i.country);
          const totalCountries = countries.length;
          const medalsPerCountry = data.map(i =>i.participations.reduce((acc, i) => acc + i.medalsCount, 0));
      return {
        totalJOs,
        totalCountries,
        countries,
        medalsPerCountry
      };
    })

  );
}

// Country data getter
public getCountryData(countryName : string): Observable<CountryData> {
  return this.getRawData().pipe(
    map((data:Olympic[]) => {
      const selectedCountry = data.find((i: Olympic) => i.country === countryName);
      const participations = selectedCountry?.participations.map((i: Participation) => i);
      const totalEntries = participations?.length ?? 0;
      const years = selectedCountry?.participations.map((i: Participation) => i.year) ?? [];
      const medals = selectedCountry?.participations.map((i: Participation) => i.medalsCount.toString()) ?? [];
      const totalMedals = medals.reduce((accumulator: number, item: string) => accumulator + parseInt(item), 0);
      const nbAthletes = selectedCountry?.participations.map((i: Participation) => i.athleteCount.toString()) ?? []
      const totalAthletes = nbAthletes.reduce((accumulator: number, item: string) => accumulator + parseInt(item), 0);
    return {
        totalEntries,
        totalMedals,
        totalAthletes,
        years,
        medals
      };
    
    
    } ))


  }


// get raw data from JSON
 private getRawData (): Observable<Olympic[]>{

  return this.http.get<Olympic[]>(this.olympicUrl).pipe(catchError(this.httpErrorHandler));

}

// error handling (display error message in console)

private httpErrorHandler(error: HttpErrorResponse) {
  console.log(`erreur : ${error}`);
  return throwError (()=> new Error(error.message))    
}




}
