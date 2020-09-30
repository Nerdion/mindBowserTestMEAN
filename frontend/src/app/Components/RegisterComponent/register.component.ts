import { Component } from '@angular/core'
import {ManagerService} from '../../Modules/ManagerModule/manager.service'
import { TokenPayload, Manager } from '../../Modules/ManagerModule/Manager'
import { Router } from '@angular/router'

@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    credentials: Manager = {
        _id:'',
        firstName:'',
        lastName:'',
        email:'',
        company:'',
        dob:new Date(),
        address:'',
        password:'',
    }

    constructor(private auth: ManagerService, private router:Router) {}

    register () {
        this.auth.register(this.credentials).subscribe(
            ()=>{
                this.router.navigateByUrl('/login')
            },
            err => {
                console.log(err)
            }
        )
    }
}