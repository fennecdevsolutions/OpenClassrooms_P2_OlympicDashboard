import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
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
  public error!:string;
  titlePage: string = "Medals per Country";

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDashboardData().subscribe({
      next: (dashboard) => {
        this.totalJOs = dashboard.totalJOs;
        this.totalCountries = dashboard.totalCountries;
        this.buildPieChart (dashboard.countries, dashboard.medalsPerCountry);
      }
    })
    
    
  }

  buildPieChart(countries: string[], sumOfAllMedalsYears: number[]) {
    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              this.router.navigate(['country', countryName]);
            }
          }
        }
      }
    });
    this.pieChart = pieChart;
  }
}

