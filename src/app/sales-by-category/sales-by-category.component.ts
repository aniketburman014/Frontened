import { Component } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-sales-by-category',
  imports: [ChartModule],
  templateUrl: './sales-by-category.component.html',
  styleUrls: ['./sales-by-category.component.scss']
})
export class SalesByCategoryComponent {
  chart = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: 'Car Industry Sales Breakdown'
    },
    xAxis: {
      categories: [
        'Sedan',
        'SUV',
        'Truck',
        'Electric',
        'Luxury'
      ]
    },
    yAxis: {
      title: {
        text: 'Sales in %'
      }
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Sedan',
            y: 40.0,  // Adjusted sales percentage for Sedan
            color: '#2f6f8f',
          },
          {
            name: 'SUV',
            y: 25.0,  // Adjusted sales percentage for SUV
            color: '#ffb84d',
          },
          {
            name: 'Truck',
            y: 15.0,  // Adjusted sales percentage for Truck
            color: '#d95f02',
          },
          {
            name: 'Electric',
            y: 10.0,  // Adjusted sales percentage for Electric cars
            color: '#1e9f96',
          },
          {
            name: 'Luxury',
            y: 10.0,  // Adjusted sales percentage for Luxury cars
            color: '#6a1b9a',
          }
        ]
      }
    ],
    credits: {
      enabled: false
    }
  })
}
