import { Component } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-top-three-products',
  imports: [ChartModule],
  templateUrl: './top-three-products.component.html',
  styleUrls: ['./top-three-products.component.scss']
})
export class TopThreeProductsComponent {
  chart = new Chart({
    chart: {
      type: 'bar',
      height: 225
    },
    title: {
      text: 'Top 3 Car Models'
    },
    xAxis: {
      categories: [
        'Toyota Corolla',
        'Honda Civic',
        'Ford F-150',
      ]
    },
    yAxis: {
      title: {
        text: 'Units Sold'
      }
    },
    series: [
     {
      type: 'bar',
      showInLegend: false,
      data: [
        {
          name: 'Toyota Corolla',
          y: 1035, // Example sales figure
          color: '#1f5d7d', // You can choose any color
        },
        {
          name: 'Honda Civic',
          y: 920, // Example sales figure
          color: '#f99d1c', // You can choose any color
        },
        {
          name: 'Ford F-150',
          y: 850, // Example sales figure
          color: '#ed832f', // You can choose any color
        },
      ]
     }
    ],
    credits: {
      enabled: false
    }
  })
}
