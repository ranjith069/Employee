
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSalaryService {

  private apiUrl = 'https://localhost:7290/api/Employee/GetAllEmployees'; // Replace with your API URL for fetching all employees

  constructor(private http: HttpClient) { }

  // Method to fetch all employees
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
