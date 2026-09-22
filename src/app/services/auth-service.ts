import { Injectable, Service } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
    providedIn:'root'
})
export class AuthService {
      register(signUpForm:User) {
        const usersList = localStorage.getItem('users');
        if(!usersList){
          localStorage.setItem("users",JSON.stringify([signUpForm]));
        }else if(usersList){
          const list = JSON.parse(usersList);
          
          list.push(signUpForm);
          localStorage.setItem('users',JSON.stringify(list));
        }
    
      }
}
