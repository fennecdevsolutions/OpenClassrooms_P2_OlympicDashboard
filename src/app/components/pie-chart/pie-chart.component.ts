import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements AfterViewInit, OnChanges {
@Output() countrySelected = new EventEmitter<number>();
@Input() countries!: string[];
@Input() medalsPerCountry!: number[];
@Input() IDs!: number[];

@ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

pieChart!: Chart;

ngAfterViewInit(): void {
  this.createPieChart();
}

@HostListener('window:resize')
OnResize() {
  if (this.pieChart) {
    this.pieChart.resize();
  }
}

ngOnChanges(changes: SimpleChanges): void {
    // added chart update to fix empty chart due to late data
    if (this.pieChart && (changes['countrie'] || changes['medalsPerCountry'])) {
      this.pieChart.data.labels = this.countries;
      this.pieChart.data.datasets[0].data = this.medalsPerCountry;
      this.pieChart.update();
    }
  }

  createPieChart () {
  this.pieChart = new Chart(this.canvasRef.nativeElement,{
    type: 'pie',
      data: {
        labels: this.countries,
        datasets: [{
          label: 'Medals',
          data: this.medalsPerCountry,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        //aspectRatio: 2.5,
        // Output selected country name on click event for Dashboard Component navigation
        onClick: (e) => {
          if (e.native) {
            const points = this.pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const clickedIndex = points[0].index;
              const countryId = this.IDs[clickedIndex];
              this.countrySelected.emit(countryId);
            }
          }
        }
      }
    });
  };

}
