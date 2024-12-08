import { Component, NgModule, OnInit } from '@angular/core';
import { CarModel } from '../model/CarModel';
import { CarModelService } from '../services/car-model.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-car-models',
  imports: [CommonModule,FormsModule],
  templateUrl: './car-models.component.html',
  styleUrl: './car-models.component.scss'
})
export class CarModelsComponent  implements OnInit{
  carModels: CarModel[] = [];
  searchQuery: string = '';
  editingCarModel: CarModel = {
    modelId: 0,
    modelName: '',
    engineType: '',
    fuelEfficiency: 0,
    designFeatures: '',
    productionCost: 0,
    status: ''
  };

  constructor(private carModelService: CarModelService) {}

  ngOnInit(): void {
    this.loadCarModels();
  }

  loadCarModels(): void {
    this.carModelService.getAllCarModels().subscribe((data) => {
      this.carModels = data;
    });
  }

  searchCarModels(): void {
    if (this.searchQuery.trim() === '') {
      this.loadCarModels();
    } else {
      this.carModels = this.carModels.filter((carModel) =>
        carModel.modelName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      
    }
  }

  addNewModel(): void {
    const newModel: CarModel = {
      modelId: 0, // Backend should assign a unique ID
      modelName: 'New Model',
      engineType: '',
      fuelEfficiency: 0,
      designFeatures: '',
      productionCost: 0,
      status: 'New',
    };
    this.carModels.unshift(newModel);// Add to the local array
    this.enableEdit(newModel); // Open edit mode for the new model
  }

  enableEdit(carModel: CarModel): void {
    this.editingCarModel = { ...carModel }; // Create a copy to edit
  }

  isEditing(carModel: CarModel): boolean {
    return this.editingCarModel?.modelId === carModel.modelId;
  }

  saveCarModel(): void {
    if(this.editingCarModel.modelId==0){
      //new item adding
      this.carModelService.createCarModel(this.editingCarModel).subscribe({
        next: ()=>{
          this.loadCarModels(); // Reload the list after a successful update
              },
              error: (error) => {
                alert('An error occurred while adding the car model.');
              }
      });
      return;
    }
    if (this.editingCarModel) {
      // Simulate saving to the backend
      const index = this.carModels.findIndex(
        (model) => model.modelId === this.editingCarModel?.modelId
      );
      if (index !== -1) {
        
        
          this.carModelService
            .updateCarModel(this.editingCarModel.modelId, this.editingCarModel)
            .subscribe({
              next: () => {
                this.loadCarModels(); // Reload the list after a successful update
              },
              error: (error) => {
                alert('An error occurred while updating the car model.');
              }
            });
        
      }
      this.editingCarModel  = {
        modelId: 0,
        modelName: '',
        engineType: '',
        fuelEfficiency: 0,
        designFeatures: '',
        productionCost: 0,
        status: ''
      }; // Exit editing mode
    }
  }

  cancelEdit(): void {
    this.editingCarModel= {
      modelId: 0,
      modelName: '',
      engineType: '',
      fuelEfficiency: 0,
      designFeatures: '',
      productionCost: 0,
      status: ''
    }; // Exit editing mode // Cancel editing
    this.loadCarModels();
  }
  deleteCarModel(Id: number): void{
    this.carModelService
            .deleteCarModel(Id)
            .subscribe({
              next: () => {
                this.loadCarModels(); // Reload the list after a successful update
              },
              error: (error) => {
                alert('An error occurred while deleting the car model.');
              }
            });
  }
}
