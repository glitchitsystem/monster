import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    validLogin = true
    loggedIn = false

    constructor(private router: Router, private route: ActivatedRoute) { }

    loginUser(username: string, password: string) {
        if (username == 'bob@bob.com' && password == 'Test123') {
            this.loggedIn = true
            this.validLogin = true
            this.router.navigate(['../mine'], { relativeTo: this.route })
        } else {
            this.validLogin = false
            return this.validLogin
        }
    }

    isAuthenticated() {
        return this.loggedIn
    }

    logout() {
        this.loggedIn = false
        this.router.navigate(['../'], { relativeTo: this.route })
        return this.loggedIn
    }
}