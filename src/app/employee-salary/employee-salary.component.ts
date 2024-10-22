
import { Component, OnInit } from '@angular/core';
import { EmployeeSalaryService } from '../employee-salary.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-employee-salary',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers: [EmployeeSalaryService],
  template: `
  <div style="text-align:center">
  <h1>
    Employee Salary Details
  </h1>

</div>
  <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Salary</th>
           </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of employees">
          <td>{{ employee.empId }}</td>
          <td>{{ employee.empName }}</td>
          <td>{{ employee.salary }}</td>
            
        </tr>
      </tbody>
    </table>

  <!-- employee-salary.component.html 
<div *ngIf="employees.length > 0; else errorTemplate">
  <h2>Employee Salary Details</h2>
  
  <ul>
    <li *ngFor="let employee of employees">
      <strong>Name:</strong> {{ employee.empName }} <br>
      <strong>Salary:</strong> ₹{{ employee.salary }}
    </li>
  </ul>
</div>   
-->
<!-- Error template in case of an API error -->
<ng-template #errorTemplate>
  <p>{{ errorMessage }}</p>
</ng-template>

`,
styles: [
]
})

export class EmployeeSalaryComponent implements OnInit {
  
  employees: any[] = [];  // To store the list of employees
  errorMessage: string = '';

  constructor(private salaryService: EmployeeSalaryService, ) {
    this.errorMessage = ''; 
   }

  ngOnInit(): void {
    // Call the service to fetch all employee details
    this.salaryService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data; // Store the employee data
      },
      error: (error) => {
        this.errorMessage = 'Error fetching employee details';
        console.error(error);
      }
    });
  }
}
