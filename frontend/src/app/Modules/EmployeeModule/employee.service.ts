import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from './Employee'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  serverUrl:string = `http://localhost:3000`
  selectedEmp: Employee
  employees: Employee[]

  constructor(private http:HttpClient, private router:Router) {
    this.selectedEmp = new Employee()
  }

  getEmployeesList() {
    const headerToken = this.getToken()
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

  private getToken() :any{
    const token = localStorage.getItem('userToken')
    if(token) return token
    else {
      this.router.navigateByUrl('/login')
      return false
    }
  }
}