import { Injectable, Service } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) { }

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
    login(formData: User): boolean {
        const usersList = localStorage.getItem('users');
        if (!usersList) {
            console.log('No users found');
            return false;
        }

        const list: User[] = JSON.parse(usersList);
        const userExists = list.find(
            user =>
                user.email === formData.email &&
                user.password === formData.password
        );
        if (userExists) {
            localStorage.setItem("user", JSON.stringify({
                name: userExists.name,
                email: userExists.email
            }))
            return true;
        }
        return false;
    }
}
