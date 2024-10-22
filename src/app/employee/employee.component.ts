import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  providers: [EmployeeService],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  cancelEdit() {
    this.employeeForm.reset();
    this.isEditing = false;
  }

  employeeForm!: FormGroup;
  employees: any[] = [];
  apiUrl = 'https://localhost:7290/api/Employee';
  isEditing = false;
  empName: string = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private employeeService: EmployeeService,
    
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAllEmployees();
    
  }
 

  createForm() {
    this.employeeForm = this.fb.group({
      empId: [''],
      empName: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      empDOB: ['', Validators.required], 
      empGender: ['', Validators.required], // Gender (M/F)
      empPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Phone number validation
      empEmail: ['', [Validators.required, Validators.email]], // Email validation
      empAddress: ['', Validators.required], // Address
      jobTitle: ['', Validators.required], // Job Title
      department: ['', Validators.required], // Department
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      if (this.isEditing) {
        this.updateEmployee(employee);
      } else {
        this.createEmployee(employee);
      }
    }
  }

  createEmployee(employee: { 
    empId?: number, 
    empName: string, 
    empDOB: string,       // Date of Birth
    empGender: string,    // Gender (M/F)
    empPhone: string,     // Phone number
    empEmail: string,     // Email address
    empAddress: string,   // Address
    jobTitle: string,     // Job Title
    department: string,    // Department
    salary: number        // Salary
}) {
    const payload = {
      empId: 0,              // Set to 0 or remove if the backend generates it
      empName: employee.empName,
      empDOB: employee.empDOB,
      empGender: employee.empGender,
      empPhone: employee.empPhone,
      empEmail: employee.empEmail,
      empAddress: employee.empAddress,
      jobTitle: employee.jobTitle,
      department: employee.department,
      salary: employee.salary
    };

    this.http.post(`${this.apiUrl}/CreateEmployee`, payload, { responseType: 'text' })
      .subscribe(
        (response) => {
          Swal.fire("Success", "Employee created successfully", "success");
          this.getAllEmployees();
          this.employeeForm.reset();
        },
        (error: HttpErrorResponse) => {
          Swal.fire("Error", `Failed to create employee: ${error.message}`, "error");
        }
      );
  }

  // getAllEmployees() {
  //   this.http.get<any[]>(`${this.apiUrl}/GetAllEmployees`)
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.employees = response;
  //       },
  //       (error: HttpErrorResponse) => {
  //         Swal.fire("Error", `Failed to fetch employees: ${error.message}`, "error");
  //       }
  //     );
  // }


  getAllEmployees() {
    this.http.get<any[]>(`${this.apiUrl}/GetAllEmployees`)
      .subscribe(
        (response) => {
          // Format the empDOB for each employee in the response
          this.employees = response.map(employee => ({
            ...employee,
            empDOB: this.formatDateToDDMMYYYY(employee.empDOB)
          }));
          console.log(this.employees); // Log formatted employees
        },
        (error: HttpErrorResponse) => {
          Swal.fire("Error", `Failed to fetch employees: ${error.message}`, "error");
        }
      );
  }
  
  // Helper function to convert date to 'dd-MM-yyyy'
  formatDateToDDMMYYYY(dateString: string): string {


    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Returns 'dd-MM-yyyy'
  }
  

  updateEmployee(employee: { empId: number, empName: string ,empDOB: string}) {
    this.http.post(`${this.apiUrl}/UpdateEmployee`, employee, { responseType: 'text' })
      .subscribe(
        (response) => {
          Swal.fire("Success", "Employee updated successfully", "success");
          this.getAllEmployees();
          this.employeeForm.reset();
          this.isEditing = false;
        },
        (error: HttpErrorResponse) => {
          Swal.fire("Error", `Failed to update employee: ${error.message}`, "error");
        }
      );
  }

  deleteEmployee(empId: number) {
    this.http.post(`${this.apiUrl}/DeleteEmployee`, { empId }, { responseType: 'text' })
      .subscribe(
        (response) => {
          Swal.fire("Success", "Employee deleted successfully", "success");
          this.getAllEmployees();
        },
        (error: HttpErrorResponse) => {
          Swal.fire("Error", `Failed to delete employee: ${error.message}`, "error");
        }
      );
  }

  editEmployee(employee: any) {
    this.employeeForm.patchValue(employee);
    this.isEditing = true;
  }
  

  
  

  onSearch(): void {
    // Only search if the search term is not empty
    if (this.empName.trim() !== '') {
      this.employeeService.searchEmployees(this.empName.trim()).subscribe((data: any) => {
        this.employees = data; // Assign the result to employees array
      }, error => {
        console.error('Error searching employees', error);
      });
    } else {
      this.employees = []; // Clear the results if search term is empty
    }
   
   
    
  }
  
  
  
}


