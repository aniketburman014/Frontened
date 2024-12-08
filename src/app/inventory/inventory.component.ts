import { Component, OnInit } from '@angular/core';
import { Inventory } from '../model/Inventory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
@Component({
  selector: 'app-inventory',
  imports: [CommonModule,FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  inventories: Inventory[] = [];
  searchQuery: string = '';
  editingInventory: Inventory = {
    inventoryId: 0,
    componentName: '',
    quantity: 0,
    supplierId: 0,
    stockLevel: 0,
    reorderThreshold: 0,
  };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getInventories().subscribe((data) => {
      this.inventories = data;
    });
  }

  searchInventories(): void {
    if (this.searchQuery.trim() === '') {
      this.loadInventories();
    } else {
      this.inventories = this.inventories.filter((inventory) =>
        inventory.componentName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  }

  addNewInventory(): void {
    const newInventory: Inventory = {
      inventoryId: 0, // Backend should assign a unique ID
      componentName: 'New Component',
      quantity: 0,
      supplierId: 0,
      stockLevel: 0,
      reorderThreshold: 0,
    };
    this.inventories.unshift(newInventory); // Add to the local array
    this.enableEdit(newInventory); // Open edit mode for the new inventory
  }

  enableEdit(inventory: Inventory): void {
    this.editingInventory = { ...inventory }; // Create a copy to edit
  }

  isEditing(inventory: Inventory): boolean {
    return this.editingInventory?.inventoryId === inventory.inventoryId;
  }

  saveInventory(): void {
    if (this.editingInventory.inventoryId === 0) {
      // Adding new inventory
      this.inventoryService.addInventory(this.editingInventory).subscribe({
        next: () => {
          this.loadInventories(); // Reload the list after a successful add
        },
        error: (error) => {
          alert('An error occurred while adding the inventory.');
        },
      });
      return;
    }

    if (this.editingInventory) {
      // Update the existing inventory
      this.inventoryService
        .updateInventory(
          this.editingInventory.inventoryId,
          this.editingInventory
        )
        .subscribe({
          next: () => {
            this.loadInventories(); // Reload the list after a successful update
          },
          error: (error) => {
            alert('An error occurred while updating the inventory.');
          },
        });
    }
    this.resetEditingInventory(); // Exit editing mode
  }

  cancelEdit(): void {
    this.resetEditingInventory(); // Exit editing mode
    this.loadInventories();
  }

  deleteInventory(id: number): void {
    this.inventoryService.deleteInventory(id).subscribe({
      next: () => {
        this.loadInventories(); // Reload the list after a successful delete
      },
      error: (error) => {
        alert('An error occurred while deleting the inventory.');
      },
    });
  }

  private resetEditingInventory(): void {
    this.editingInventory = {
      inventoryId: 0,
      componentName: '',
      quantity: 0,
      supplierId: 0,
      stockLevel: 0,
      reorderThreshold: 0,
    };
  }
}
