import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Manager } from './Modules/ManagerModule/Manager'
import { ManagerService} from './Modules/ManagerModule/manager.service'


@Injectable()
export class AuthGaurdService implements CanActivate {
    constructor(private auth: ManagerService, private router: Router) {}
    
    canActivate() {
        if(!this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/login')
            return false
        }
        return true
    }
}