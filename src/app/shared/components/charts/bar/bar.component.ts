import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'jlc-bar',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  template: `<div id="chart" class="w-full">
  <apx-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [dataLabels]="chartOptions.dataLabels"
    [plotOptions]="chartOptions.plotOptions"
    [yaxis]="chartOptions.yaxis"
    [legend]="chartOptions.legend"
    [fill]="chartOptions.fill"
    [stroke]="chartOptions.stroke"
    [tooltip]="chartOptions.tooltip"
    [xaxis]="chartOptions.xaxis"
  />
</div>`,
  styleUrl: './bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }
      ],
      chart: {
        height: 400,
        width: 400,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val + "%";
          }
        }
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: true,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }
}
