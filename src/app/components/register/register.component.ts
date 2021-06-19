import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
  ) { }

  email = new FormControl('');
  password = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  registerError = '';

  ngOnInit(): void {
    this.authService.currentRegisterError().subscribe(error => this.registerError = error);
  }

  public attemptRegister() {
    this.authService.attemptRegister(this.email.value, this.password.value, this.firstName.value, this.lastName.value);
  }

  public changeToLogin() {
    this.authService.changeToLogin();
  }

}
