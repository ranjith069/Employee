import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7290/api/Employee/SearchEmployees'; 

  constructor(private http: HttpClient) { }

  searchEmployees(empName: string): Observable<any> {
    // Construct the search URL with the search term as a query string
    const url = `${this.apiUrl}?empName=${encodeURIComponent(empName)}`;
    return this.http.get(url);
  }
}
