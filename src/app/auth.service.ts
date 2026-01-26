import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  validLogin = true;
  loggedIn = false;

  private STORAGE_KEY = "auth_logged_in";

  constructor(private router: Router) {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      this.loggedIn = raw === "true";
    } catch (e) {
      this.loggedIn = false;
    }
  }

  loginUser(username: string, password: string): boolean {
    if (username === "bob@bob.com" && password === "Test123") {
      this.loggedIn = true;
      this.validLogin = true;
      try {
        localStorage.setItem(this.STORAGE_KEY, "true");
      } catch {}
      this.router.navigate(["/mine"]);
      return true;
    } else {
      this.validLogin = false;
      this.loggedIn = false;
      try {
        localStorage.removeItem(this.STORAGE_KEY);
      } catch {}
      return false;
    }
  }

  isAuthenticated() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {}
    this.router.navigate(["/"]);
    return this.loggedIn;
  }
}
