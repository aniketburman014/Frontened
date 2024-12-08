import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { CarModelsComponent } from './car-models/car-models.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SalesComponent } from './sales/sales.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    {
        path:'', redirectTo: 'login', pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent,  
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'home',
        component:HomeComponent,
        children: [
            { path: '', redirectTo: 'about', pathMatch: 'full' },
            { path: 'stats', component: MainComponent },
            {path:'about',component:AboutComponent },
            {path:'users',component:UsersComponent},
            {path:'carmodels',component:CarModelsComponent},
            {path:'inventory',component:InventoryComponent},
            {path:'supplier',component:SupplierComponent},
            {path:'sales',component:SalesComponent},
            {path:'feedback',component:FeedbackComponent},

            // Add more child routes as needed
          ]
    },
    {
        path:'form',
        component:FormComponent
    }
];
