import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../model/SalesOrder';
import { SalesService } from '../services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sales',
  imports: [CommonModule,FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  salesOrders: SalesOrder[] = [];
  searchQuery: string = '';
  editingOrder: SalesOrder = {
    orderId: 0,
    customerId: 0,
    carModelId: 0,
    orderDate: new Date(),
    deliveryDate: new Date(),
    price: 0,
    status: '',
  };

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSalesOrders();
  }

  loadSalesOrders(): void {
    this.salesService.getSalesOrders().subscribe((data) => {
      this.salesOrders = data;
    });
  }

  searchOrders(): void {
    if (this.searchQuery.trim() === '') {
      this.loadSalesOrders();
    } else {
      this.salesService.searchSalesOrders(this.searchQuery).subscribe((data)=>{
        this.salesOrders=data
  
      });
    }
  }

  addNewOrder(): void {
    const newOrder: SalesOrder = {
      orderId: 0, // Backend should assign a unique ID
      customerId: 0,
      carModelId: 0,
      orderDate: new Date(),
      deliveryDate: new Date(),
      price: 0,
      status: 'New',
    };
    this.salesOrders.unshift(newOrder); // Add to the local array
    this.enableEdit(newOrder); // Open edit mode for the new order
  }

  enableEdit(order: SalesOrder): void {
    this.editingOrder = { ...order }; // Create a copy to edit
  }

  isEditing(order: SalesOrder): boolean {
    return this.editingOrder?.orderId === order.orderId;
  }

  saveOrder(): void {
    if (this.editingOrder.orderId === 0) {
      // New item adding
      this.salesService.addSalesOrder(this.editingOrder).subscribe({
        next: () => {
          this.loadSalesOrders(); // Reload the list after a successful addition
        },
        error: (error) => {
          alert('An error occurred while adding the order.');
        },
      });
      return;
    }

    if (this.editingOrder) {
      // Update the existing order
      this.salesService
        .updateSalesOrder(this.editingOrder.orderId, this.editingOrder)
        .subscribe({
          next: () => {
            this.loadSalesOrders(); // Reload the list after a successful update
          },
          error: (error) => {
            alert('An error occurred while updating the order.');
          },
        });
    }
    this.resetEditingOrder(); // Exit editing mode
  }

  cancelEdit(): void {
    this.resetEditingOrder(); // Cancel editing and reset form
    this.loadSalesOrders();
  }

  deleteOrder(id: number): void {
    this.salesService.deleteSalesOrder(id).subscribe({
      next: () => {
        this.loadSalesOrders(); // Reload the list after a successful deletion
      },
      error: (error) => {
        alert('An error occurred while deleting the order.');
      },
    });
  }

  private resetEditingOrder(): void {
    this.editingOrder = {
      orderId: 0,
      customerId: 0,
      carModelId: 0,
      orderDate: new Date(),
      deliveryDate: new Date(),
      price: 0,
      status: '',
    }; // Reset editing order to default state
  }
}