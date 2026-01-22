import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Olympic, Participation, DashboardData, CountryData } from '../models/interfaces';
import { catchError, Observable, throwError, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private olympicUrl = './assets/mock/olympic.json';
  private http = inject(HttpClient);

  


// dashboard data getter

public getDashboardData(): Observable<DashboardData> {
  return this.getRawData().pipe(
    map((data: Olympic[]) => {
          const totalJOs = Array.from(new Set(data.map((i: Olympic) => i.participations.map((f: Participation) => f.year)).flat())).length;
          const countries: string[] = data.map(i => i.country);
          const iDs : number[] = data.map(i => i.id);
          const totalCountries = countries.length;
          const medalsPerCountry = data.map(i =>i.participations.reduce((acc, i) => acc + i.medalsCount, 0));
      return {
        totalJOs,
        totalCountries,
        countries,
        medalsPerCountry,
        iDs
      };
    })

  );
}

// Country data getter
public getCountryData(countryiD : number): Observable<CountryData | null> {
  return this.getRawData().pipe(
    map((data:Olympic[])  => {
      const selectedCountry = data.find((i: Olympic) => i.id === countryiD);
      if (!selectedCountry) {
        return null;
      }
      const participations = selectedCountry.participations.map((i: Participation) => i);
      
    return {
        countryName : selectedCountry.country,
        totalEntries : participations.length,
        totalMedals : participations.reduce((accumulator: number, item: Participation) => accumulator + item.medalsCount, 0),
        totalAthletes: participations.reduce((accumulator: number, item: Participation) => accumulator + item.athleteCount, 0),
        years : participations.map((i: Participation) => i.year) ?? [],
        medals : participations.map((i: Participation) => i.medalsCount.toString()) ?? []
      };
    
    
    } ))


  }


// get raw data from JSON
 private getRawData (): Observable<Olympic[]>{

  return this.http.get<Olympic[]>(this.olympicUrl).pipe(catchError(this.httpErrorHandler))//,delay(2500));

}

// error handling (display error message in console)

private httpErrorHandler(error: HttpErrorResponse) {
  console.log(`erreur : ${error}`);
  return throwError (()=> new Error(error.message))    
}




}
