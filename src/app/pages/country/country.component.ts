import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Chart from 'chart.js/auto';
import { HeaderData } from 'src/app/models/interfaces';
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
  public countryName!: string;
  public years!: number[];
  public medals!: number[];
  public cards!: HeaderData[];

  // Injection moderne suite recommendation ESLint
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);


  ngOnInit() {
    const fetchedCountryName =this.route.snapshot.paramMap.get('countryName');
    if (fetchedCountryName === null) {
      return;
    }
    this.countryName = fetchedCountryName;
    this.titlePage = this.countryName;
    this.dataService.getCountryData(this.countryName).subscribe({
      next: (countryData) => {
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
        
      }
    })
  
    
  }

  
}
