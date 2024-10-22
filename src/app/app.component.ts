import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee.service';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EmployeeComponent,EmployeeSalaryComponent],
  providers: [EmployeeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'curd';
  constructor(private router: Router) { }

  // Method to navigate to Employee Details
  goToEmployeeDetails() {
    this.router.navigate(['/employee-details']);
  }

  // Method to navigate to Employee Salary
  goToEmployeeSalary() {
    this.router.navigate(['/employee-salary']);
  }
}

