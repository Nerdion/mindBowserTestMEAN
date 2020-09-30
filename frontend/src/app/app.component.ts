import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ManagerService } from './Modules/ManagerModule/manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'frontend';
  constructor(public auth:ManagerService) {}
}
