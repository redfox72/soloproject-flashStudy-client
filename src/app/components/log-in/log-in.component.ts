import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private location: Location
  ) { }

  email = new FormControl('');
  password = new FormControl('');
  loginError = '';

  ngOnInit(): void {
    this.authService.currentLoginError().subscribe(error => this.loginError = error);
  }

  public attemptLogin() {
    this.authService.attemptLogin(this.email.value, this.password.value);
  }

  public changeToRegister() {
    this.authService.changeToRegister();
  }
}
