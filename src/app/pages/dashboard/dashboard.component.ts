import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { HeaderData } from 'src/app/models/interfaces';
import { UiState } from 'src/app/models/ui-state';
import { DataService } from 'src/app/services/data.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  // States declaration
  uiState !: UiState;
  // properties and objects
  public pieChart!: Chart<"pie", number[], string>;
  totalCountries!: number;
  totalJOs!: number;
  public countries!: string[];
  public iDs !: number[];
  public medalsPerCountry!: number[]
  public cards!: HeaderData[];
  public titlePage !: string; 
  
  // Injection moderne suite recommendation ESLint
  private router = inject(Router);
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);


  ngOnInit() {
    this.uiState = 'loading';

    
    this.dataService.getDashboardData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (dashboard) => {
        if(!dashboard || dashboard.countries.length === 0) {
          this.uiState = 'empty';
          return;
        }

        this.totalJOs = dashboard.totalJOs;
        this.totalCountries = dashboard.totalCountries;
        this.countries = dashboard.countries;
        this.iDs=dashboard.iDs;
        this.medalsPerCountry = dashboard.medalsPerCountry;
        this.cards = [
          { label: 'Number of countries', value: this.totalCountries },
          { label: 'Number of JOs', value: this.totalJOs },
        ];
        this.titlePage = "Medals per Country";
        this.uiState = 'success';
        
      },
    error: () => {
      this.uiState = 'error';
    }
  
    });
    
 
  }

  onCountrySelected(iD: number) {

  this.router.navigate(['country', iD]);

}

 
}

