import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
})
export class Signup {

  constructor(private authService: AuthService) { }
  successMessage:string='';
  signupForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_@$]{6,}$/)
      ]),

      confirmPassword: new FormControl('', [
        Validators.required
      ])
    },
    {
      validators: this.validPassword
    }
  );

  // Getters
  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  // Password confirmation validator
  validPassword(control: AbstractControl) {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (
      password &&
      confirmPassword &&
      password !== confirmPassword
    ) {
      return {
        passwordMismatch: true
      };
    }

    return null;
  }

  handleRequest(signUpForm: FormGroup) {

    // Show all validation errors
    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;
    }

    const success: boolean = this.authService.register(signUpForm.value)
    if (!success) {
      this.signupForm.get('email')?.setErrors({
        emailExists: true
      });

      this.signupForm.get('email')?.markAsTouched();
      this.successMessage=''
    }else{
      this.successMessage="User Created Successfully";
    }

  }
}