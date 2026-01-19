import { AfterViewInit, Component, ElementRef,HostListener,Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements AfterViewInit,OnChanges {

@Input() years!: number[];
@Input() medals!: number[];

@ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

lineChart!: Chart;

ngAfterViewInit(): void {
  this.createLineChart();
}
@HostListener('window:resize')
  onResize() {
    if (this.lineChart) {
      this.lineChart.resize();
    }
  }
ngOnChanges(changes: SimpleChanges): void {
    // added chart update to fix empty chart due to late data
    if (this.lineChart && (changes['years'] || changes['medals'])) {
      this.lineChart.data.labels = this.years;
      this.lineChart.data.datasets[0].data = this.medals;
      this.lineChart.update();
    }
  }
  createLineChart () {
  this.lineChart = new Chart(this.canvasRef.nativeElement,{
    type: 'line',
      data: {
        labels: this.years,
        datasets: [
          {
            label: 'medals',
            data: this.medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        //aspectRatio: 2.5
      }
    })
  };

}

