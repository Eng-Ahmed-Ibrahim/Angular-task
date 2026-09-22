import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { required } from '@angular/forms/signals';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(private router: Router) { }
  errorMessage: string = ''
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
    const usersList = localStorage.getItem('users');
    if (!usersList) {
      console.log('No users found');
      return;
    }

    const list: User[] = JSON.parse(usersList);
    const userExists = list.some(
      user =>
        user.email === formData.value.email &&
        user.password === formData.value.password
    );
    if (userExists) {
      this.router.navigate(['/home']);
      return;
    }
    this.errorMessage = "Invalid Email or password"
  }
}
