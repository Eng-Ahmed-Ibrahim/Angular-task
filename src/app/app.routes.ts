import { RouterModule, Routes } from '@angular/router';
import { App } from './app';



export const routes: Routes = [
  {
    path: '',
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
        path: 'products',
        loadComponent: () =>
          import('./components/products/products').then(m => m.Products)

      },
    ]
  },
  {
    path:'auth',
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
