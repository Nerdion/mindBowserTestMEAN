import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
    return this.http.get(this.serverUrl, headerToken)
  }

  postEmployee(employee: Employee) {
    const headerToken = this.getToken()
    return this.http.post(this.serverUrl, employee, headerToken)
  }

  putEmployee(employee: Employee) {
    const headerToken = this.getToken()
    return this.http.put(`${this.serverUrl}/${employee._id}`, employee, headerToken)
  }

  deleteEmployee(_id:string) {
    const headerToken = this.getToken()
    return this.http.delete(`${this.serverUrl}/${_id}`, headerToken)
  }

  private getToken() :any{
    const token = localStorage.getItem('userToken')
    if(token) return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'authorization': token})
    }
    else {
      this.router.navigateByUrl('/login')
      return false
    }
  }
}