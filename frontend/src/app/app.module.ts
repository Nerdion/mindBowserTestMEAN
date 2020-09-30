import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/LoginComponent/login.component'
import { RegisterComponent } from './Components/RegisterComponent/register.component'
import { DashboardComponent} from './Components/DashboardComponent/dashboard.component'
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './authGaurd.service';

const routes:Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGaurdService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
