import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { authGuardGuard } from './guards/auth-guard-guard';
import { guestGuard } from './guards/guest-guard';



export const routes: Routes = [
  {
    path: '',
    canActivate:[authGuardGuard],
    loadComponent: () =>
      import('./components/layouts/blank-layout/blank-layout')
        .then(m => m.BlankLayout),
    children: [
      {path:"",redirectTo:"home",pathMatch:"full"},
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home').then(m => m.Home)
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart').then(m => m.Cart)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products').then(m => m.Products)
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./components/product-details/product-details').then(m => m.ProductDetails)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products').then(m => m.Products)

      },
    ]
  },
  {
    path:'auth',
    canActivate:[guestGuard],
    loadComponent: ()=> import('./components/layouts/auth-layout/auth-layout').then(m=>m.AuthLayout),
    children:[
      {path:"",redirectTo:"login",pathMatch:"full"},
      {
        path:'login',
        loadComponent:()=>import('./components/login/login').then(m=>m.Login)
      },
      {
        path:'register',
        loadComponent:()=>import('./components/signup/signup').then(m=>m.Signup)
      }
    ]
  }
];
