import { Component,OnInit } from '@angular/core';
import { Supplier } from '../model/Supplier';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../services/supplier.service';
@Component({
  selector: 'app-supplier',
  imports: [CommonModule,FormsModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[] = [];
  searchQuery: string = '';
  editingSupplier: Supplier = {
    supplierId: 0,
    name: '',
    contactDetails: '',
    materialType: '',
    deliveryTime: 0,
    pricing: 0,
    status: '',
  };

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
  }

  searchSuppliers(): void {
    if (this.searchQuery.trim() === '') {
      this.loadSuppliers();
    } else {
      this.suppliers = this.suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(this.searchQuery.toLowerCase()) 
      );
      
    }
  }

  addNewSupplier(): void {
    const newSupplier: Supplier = {
      supplierId: 0, // Backend should assign a unique ID
      name: 'New Supplier',
      contactDetails: '',
      materialType: '',
      deliveryTime: 0,
      pricing: 0,
      status: 'New',
    };
    this.suppliers.unshift(newSupplier); // Add to the local array
    this.enableEdit(newSupplier); // Open edit mode for the new supplier
  }

  enableEdit(supplier: Supplier): void {
    this.editingSupplier = { ...supplier }; // Create a copy to edit
  }

  isEditing(supplier: Supplier): boolean {
    return this.editingSupplier?.supplierId === supplier.supplierId;
  }

  saveSupplier(): void {
    if (this.editingSupplier.supplierId === 0) {
      // New item adding
      this.supplierService.addSupplier(this.editingSupplier).subscribe({
        next: () => {
          this.loadSuppliers(); // Reload the list after a successful update
        },
        error: (error) => {
          alert('An error occurred while adding the supplier.');
        },
      });
      return;
    }

    if (this.editingSupplier) {
      // Update the existing supplier
      this.supplierService
        .updateSupplier(this.editingSupplier.supplierId, this.editingSupplier)
        .subscribe({
          next: () => {
            this.loadSuppliers(); // Reload the list after a successful update
          },
          error: (error) => {
            alert('An error occurred while updating the supplier.');
          },
        });
    }
    this.editingSupplier = {
      supplierId: 0,
      name: '',
      contactDetails: '',
      materialType: '',
      deliveryTime: 0,
      pricing: 0,
      status: '',
    }; // Exit editing mode
  }

  cancelEdit(): void {
    this.editingSupplier = {
      supplierId: 0,
      name: '',
      contactDetails: '',
      materialType: '',
      deliveryTime: 0,
      pricing: 0,
      status: '',
    }; // Exit editing mode // Cancel editing
    this.loadSuppliers();
  }

  deleteSupplier(id: number): void {
    this.supplierService.deleteSupplier(id).subscribe({
      next: () => {
        this.loadSuppliers(); // Reload the list after a successful update
      },
      error: (error) => {
        alert('An error occurred while deleting the supplier.');
      },
    });
  }
}
