import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-sales-by-month',
  imports: [CommonModule, RouterModule, ChartModule],
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.scss']
})
export class SalesByMonthComponent {
  chart = new Chart({
    chart: {
      type: 'line',
      height: 325
    },
    title: {
      text: 'Monthly Sales Breakdown in Car Industry'
    },
    xAxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in $'
      }
    },
    series: [
      {
        name: 'Sedan',
        type: 'line',
        color: '#2f6f8f',
        data: [20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000] // Example sales data for Sedan
      },
      {
        name: 'SUV',
        type: 'line',
        color: '#ffb84d',
        data: [30000, 32000, 35000, 37000, 40000, 42000, 45000, 48000, 50000, 53000, 56000, 59000] // Example sales data for SUV
      },
      {
        name: 'Truck',
        type: 'line',
        color: '#d95f02',
        data: [15000, 16000, 17000, 19000, 20000, 21000, 22000, 24000, 25000, 26000, 27000, 28000] // Example sales data for Truck
      },
      {
        name: 'Electric',
        type: 'line',
        color: '#1e9f96',
        data: [10000, 12000, 15000, 17000, 18000, 19000, 22000, 24000, 26000, 28000, 30000, 32000] // Example sales data for Electric cars
      },
      {
        name: 'Luxury',
        type: 'line',
        color: '#6a1b9a',
        data: [12000, 15000, 18000, 19000, 20000, 22000, 25000, 27000, 29000, 31000, 34000, 36000] // Example sales data for Luxury cars
      }
    ],
    credits: {
      enabled: false
    }
  });
}
