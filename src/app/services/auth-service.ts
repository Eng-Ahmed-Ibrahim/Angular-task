import { Injectable, Service } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    register(signUpForm: User): boolean {
        const usersList = localStorage.getItem('users');
        if (!usersList) {
            localStorage.setItem("users", JSON.stringify([signUpForm]));
        } else if (usersList) {
            const list: User[] = JSON.parse(usersList);
            const emailExists = list.some(
                user => user.email.toLowerCase() === signUpForm.email.toLowerCase()
            );

            if (emailExists) {
                console.log('Email already exists');
                return false;
            }
            list.push(signUpForm);
            localStorage.setItem('users', JSON.stringify(list));
        }
        return true;

    }
}
