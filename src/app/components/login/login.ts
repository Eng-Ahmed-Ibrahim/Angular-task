import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { required } from '@angular/forms/signals';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(private authService: AuthService, private router: Router) { }
  errorMessage: string = ''
  successMessage: string = ''
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
    ])
  });
  handleRequest(formData: FormGroup) {
    if (formData.invalid) {
      console.log("invaild");
      return;
    }
    const result: boolean = this.authService.login(formData.value);
    if (result) {
      this.successMessage = "Login Successfully"
      this.router.navigate(['home']);
      return ;
    }
    this.errorMessage = "Invalid Email or password"
  }
}
