import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-last-few-transaction',
  imports: [ChartModule,RouterModule,CommonModule],
  templateUrl: './last-few-transaction.component.html',
  styleUrl: './last-few-transaction.component.scss'
})
export class LastFewTransactionComponent {
  transactions = [
    {
      id: 1,
      title: "Tesla Model S",
      price: "$89,000",
      shop: "Tesla Showroom",
      location: "San Francisco",
      status: "completed",
      imgSrc: "assets/download.jpeg"
    },
    {
      id: 2,
      title: "BMW X5",
      price: "$75,000",
      shop: "BMW Dealer",
      location: "Los Angeles",
      status: "pending",
      imgSrc: "assets/download.jpeg"
    },
    {
      id: 3,
      title: "Ford Mustang GT",
      price: "$55,000",
      shop: "Ford Dealership",
      location: "Detroit",
      status: "completed",
      imgSrc: "assets/download.jpeg"
    },
    {
      id: 4,
      title: "Chevrolet Camaro SS",
      price: "$50,000",
      shop: "Chevrolet Store",
      location: "Chicago",
      status: "pending",
      imgSrc: "assets/download.jpeg"
    },
    {
      id: 5,
      title: "Audi Q7",
      price: "$65,000",
      shop: "Audi Center",
      location: "New York",
      status: "completed",
      imgSrc: "assets/download.jpeg"
    },
    {
      id: 6,
      title: "Toyota Camry",
      price: "$28,000",
      shop: "Toyota Dealer",
      location: "Houston",
      status: "completed",
      imgSrc: "assets/download.jpeg"
    }
  ];
}
