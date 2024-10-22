import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';

export const routes: Routes = [
    { path: 'employee-details', component: EmployeeComponent },
    { path: 'employee-salary', component: EmployeeSalaryComponent },  // Add a new route for employee salary
    { path: '', redirectTo: '/employee-details', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/employee-details' } // Wildcard route for invalid URLs
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)], // Ensure this is `forRoot` in the root module
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  