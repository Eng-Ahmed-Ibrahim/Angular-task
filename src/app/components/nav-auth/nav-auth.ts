import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink,RouterLinkActive],
  selector: 'app-nav-auth',
  styleUrl: './nav-auth.css',
  templateUrl: './nav-auth.html',
})
export class NavAuth {}
