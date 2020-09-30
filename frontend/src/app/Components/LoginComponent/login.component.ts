import { Component } from '@angular/core'
import { ManagerService } from '../../Modules/ManagerModule/manager.service'
import { Manager, TokenPayload } from '../../Modules/ManagerModule/Manager'
import { Router } from '@angular/router'

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {
    credentials: Manager = {
        _id:'',
        firstName:'',
        lastName:'',
        email:'',
        company: '',
        dob:new Date(),
        address:'',
        password:''
    }

    constructor(private auth:ManagerService, private router:Router) {}

    login() {
        this.auth.login(this.credentials).subscribe(
            ()=>{
                this.router.navigateByUrl('/')
            },
            err=>{
                console.error(err)
            }
        )
    }
}