import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Employee } from './Employee';
import { EmployeeService } from './employee.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EmployeeService]
})

export class AppComponent {
  title = 'frontend';
  constructor(public employeeService:EmployeeService) {}
  employeeList:any;

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees() {
    this.employeeService.getEmployeesList()
    .subscribe((res)=>{
      this.employeeService.employees = res as Employee[]
      this.employeeList = this.employeeService.employees
    })
  }

  postEmployee(form: NgForm) {
    if(form.value._id) {
      this.employeeService.putEmployee(form.value)
      .subscribe((res)=> {
        console.log(res)
        this.getEmployees()
        this.employeeService.selectedEmp = new Employee()
      })
    } else {
      this.employeeService.postEmployee(form.value)
      .subscribe((res)=> {
        this.getEmployees()
        this.employeeService.selectedEmp = new Employee()
      })
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmp = employee
  }

  deleteEmployee(_id:string) {
    this.employeeService.deleteEmployee(_id)
    .subscribe((res)=>{
      this.getEmployees()
      this.employeeService.selectedEmp = new Employee()
    })
  }
}
