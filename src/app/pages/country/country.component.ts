import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Chart from 'chart.js/auto';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  
  public lineChart!: Chart<"line", string[], number>;
  public titlePage!: string;
  public totalEntries: any = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;
  public countryName!: string;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    let fetchedCountryName =this.route.snapshot.paramMap.get('countryName');
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
        this.buildChart (countryData.years, countryData.medals);
      }
    })
  
    
  }

  buildChart(years: number[], medals: string[]) {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    this.lineChart = lineChart;
  }
}
