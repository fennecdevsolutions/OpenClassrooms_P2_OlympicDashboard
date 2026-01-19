import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Chart from 'chart.js/auto';
import { HeaderData } from 'src/app/models/interfaces';
import { UiState } from 'src/app/models/ui-state';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
 
})
export class CountryComponent implements OnInit {
  
  public lineChart!: Chart<"line", string[], number>;
  public titlePage!: string;
  public totalEntries!: number;
  public totalMedals!: number;
  public totalAthletes!: number;
  
  public years!: number[];
  public medals!: number[];
  public cards!: HeaderData[];

  //state declaration
  Uistate !: UiState;

  // Injection moderne suite recommendation ESLint
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);


  ngOnInit() {
    this.Uistate = 'loading';

    const fetchedCountryId =this.route.snapshot.paramMap.get('id');
    
    // If cannot retrieve Id, set state to empty
    if (fetchedCountryId === null) {
      this.Uistate = 'empty'
      return;
    }
    
    
    
    this.dataService.getCountryData(Number(fetchedCountryId)).subscribe({
      next: (countryData) => {
        if (!countryData || countryData.years.length === 0) {
          
          this.router.navigate(['not-found']);
          return;
        }
        this.titlePage = countryData.countryName;
        this.totalEntries = countryData.totalEntries;
        this.totalMedals = countryData.totalMedals;
        this.totalAthletes = countryData.totalAthletes;
        this.years = countryData.years;
        this.medals = countryData.medals.map(medal => parseInt(medal));
        this.cards = [
          { label: 'Number of entries', value: this.totalEntries },
          { label: 'Total Number of medals', value: this.totalMedals },
          { label: 'Total Number of athletes', value: this.totalAthletes }
        ];
        this.Uistate = 'success';
        
      },
      error: () => {
      this.Uistate = 'error';
    
    }})
  
    
  }

  
}
