import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { HeaderData } from 'src/app/models/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
 
  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries!: number;
  public totalJOs!: number;
  public countries!: string[];
  public iDs !: number[];
  public medalsPerCountry!: number[]
  public cards!: HeaderData[];
  titlePage = "Medals per Country";
  
  // Injection moderne suite recommendation ESLint
  private router = inject(Router);
  private dataService = inject(DataService);




  ngOnInit() {
    this.dataService.getDashboardData().subscribe({
      next: (dashboard) => {
        this.totalJOs = dashboard.totalJOs;
        this.totalCountries = dashboard.totalCountries;
        this.countries = dashboard.countries;
        this.iDs=dashboard.iDs;
        this.medalsPerCountry = dashboard.medalsPerCountry;
        this.cards = [
          { label: 'Number of countries', value: this.totalCountries },
          { label: 'Number of JOs', value: this.totalJOs },
        ];
        
      }
    })
    
    
  }


  onCountrySelected(iD: number) {

  this.router.navigate(['country', iD]);

}

  
}

