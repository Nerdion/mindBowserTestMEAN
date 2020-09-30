import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Manager, TokenPayload, TokenResponse } from './Manager'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ManagerService {
    private token: string
    serverUrl:string = `http://localhost:3000`

    constructor(private http: HttpClient, private router:Router) {}

    private saveToken(token: string): void {
        localStorage.setItem('userToken', token)
        this.token = token
    }

    private getToken():string {
        if(!this.token) {
            this.token = localStorage.getItem('userToken')
        }
        return this.token
    }

    public getUserDetails(): Manager {
        const token = this.getToken()
        let payload
        if(token) {
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        } else return null
    }

    public isLoggedIn(): boolean {
        const isLoggedInFlag = this.getUserDetails()
        if(isLoggedInFlag) {
            return true
        } else {
            return false
        }
    }

    public register(user:Manager) {
        return this.http.post(`${this.serverUrl}/register`,user)
    }


    // public login(user:Manager) {
    //     const response:any = this.http.post(`${this.serverUrl}/login`, user)
    //     if(response.token) {
    //         this.saveToken(response.token)
    //         this.router.navigateByUrl('/dashboard')
    //         return response
    //     } else {
    //         this.router.navigateByUrl('/login')
    //         return response
    //     }
    // }


    public login(user: TokenPayload) : Observable<any> {
        const base = this.http.post(`${this.serverUrl}/login`, user)

        const request = base.pipe(
            map((data: TokenResponse) => {
                if(data.token) {
                    this.saveToken(data.token)
                }
                return data
            })
        )
        return request
    }

    public profile () : Observable<any> {
        return this.http.get(`${this.serverUrl}/profile`, {
            headers : { Authorization: `${this.getToken()}` }
        }) 
    }

    public logout (): void {
        this.token = ''
        window.localStorage.removeItem('userToken')
        this.router.navigateByUrl('/')
    }
}