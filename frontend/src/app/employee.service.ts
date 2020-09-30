import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from './Employee'

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  serverUrl:string = `http://localhost:3000`
  selectedEmp: Employee
  employees: Employee[]

  constructor(private http:HttpClient) {
    this.selectedEmp = new Employee()
  }

  getEmployeesList() {
    return this.http.get(this.serverUrl)
  }

  postEmployee(employee: Employee) {
    return this.http.post(this.serverUrl, employee)
  }

  putEmployee(employee: Employee) {
    return this.http.put(`${this.serverUrl}/${employee._id}`, employee)
  }

  deleteEmployee(_id:string) {
    return this.http.delete(`${this.serverUrl}/${_id}`)
  }
}