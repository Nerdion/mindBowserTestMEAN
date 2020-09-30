import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Employee } from '../../Modules/EmployeeModule/Employee';
import { EmployeeService } from '../../Modules/EmployeeModule/employee.service'

@Component({
    selector: 'app-root',
    templateUrl: './dashboard.component.html',
    providers: [EmployeeService]
})

export class DashboardComponent {

    constructor(public employeeService:EmployeeService) {}
    
    employeeList:any;
    
    ngOnInit() {
        this.getEmployees()
    }
    getEmployees() {
        this.employeeService.getEmployeesList()
            .subscribe((res) => {
                this.employeeService.employees = res as unknown as Employee[]
                this.employeeList = this.employeeService.employees
            })
    }

    postEmployee(form: NgForm) {
        if (form.value._id) {
            this.employeeService.putEmployee(form.value)
                .subscribe((res) => {
                    this.getEmployees()
                    this.employeeService.selectedEmp = new Employee()
                })
        } else {
            this.employeeService.postEmployee(form.value)
                .subscribe((res) => {
                    this.getEmployees()
                    this.employeeService.selectedEmp = new Employee()
                })
        }
    }

    editEmployee(employee: Employee) {
        this.employeeService.selectedEmp = employee
    }

    deleteEmployee(_id: string) {
        this.employeeService.deleteEmployee(_id)
            .subscribe((res) => {
                this.getEmployees()
                this.employeeService.selectedEmp = new Employee()
            })
    }
}