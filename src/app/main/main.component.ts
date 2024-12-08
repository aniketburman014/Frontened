import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopWidgetsComponent } from "../top-widgets/top-widgets.component";
import { SalesByMonthComponent } from "../sales-by-month/sales-by-month.component";
import { SalesByCategoryComponent } from "../sales-by-category/sales-by-category.component";
import { LastFewTransactionComponent } from "../last-few-transaction/last-few-transaction.component";
import { TopThreeProductsComponent } from "../top-three-products/top-three-products.component";
@Component({
  selector: 'app-main',
  imports: [RouterModule, CommonModule, TopWidgetsComponent, SalesByMonthComponent, SalesByCategoryComponent, LastFewTransactionComponent, TopThreeProductsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
