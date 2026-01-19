import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { HeaderData } from 'src/app/models/interfaces';
import { UiState } from 'src/app/models/ui-state';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  // States declaration
  UiState !: UiState;
 
  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries!: number;
  public totalJOs!: number;
  public countries!: string[];
  public iDs !: number[];
  public medalsPerCountry!: number[]
  public cards!: HeaderData[];
  public titlePage !: string; 
  
  // Injection moderne suite recommendation ESLint
  private router = inject(Router);
  private dataService = inject(DataService);


  ngOnInit() {
    this.UiState = 'loading';

    
    this.dataService.getDashboardData().subscribe({
      next: (dashboard) => {
        if(!dashboard || dashboard.countries.length === 0) {
          this.UiState = 'empty';
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
        this.UiState = 'success';
        
      },
    error: () => {
      this.UiState = 'error';
    }
  
    });
    
 
  }

  onCountrySelected(iD: number) {

  this.router.navigate(['country', iD]);

}

 
}

