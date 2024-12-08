import { Component, OnInit } from '@angular/core';
import { faInfoCircle, faUsers, faCar, faWarehouse, faDollarSign, faChartBar, faIndustry, faTruck, faFileAlt, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-nav',
  imports: [FontAwesomeModule,RouterModule,CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  faUsers = faUsers;
  faCar = faCar;
  faWarehouse = faWarehouse;
  faDollarSign = faDollarSign;
  faChartBar = faChartBar;
  faIndustry = faIndustry;
  faTruck = faTruck;
  faFileAlt = faFileAlt;
  faComments = faComments;
  constructor() { }

  ngOnInit(): void {
  }
}
