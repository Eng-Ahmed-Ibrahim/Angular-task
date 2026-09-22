import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAuth } from '../../nav-auth/nav-auth';

@Component({
  imports: [RouterOutlet,NavAuth],
  selector: 'app-auth-layout',
  styleUrl: './auth-layout.css',
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
