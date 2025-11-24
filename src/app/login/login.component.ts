import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loggedIn: any
  validLogin = null

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.initForm()

    this.loggedIn = this.authService.loggedIn

    if (this.loggedIn) {
      this.router.navigate(['../mine'], { relativeTo: this.route })
    }
  }

  private initForm() {
    let username = ''
    let password = ''

    this.loginForm = new FormGroup({
      'username': new FormControl(username, [Validators.required, Validators.email]),
      'password': new FormControl(password, Validators.required)
    })
  }

  onSubmit(form: NgForm) {
    const username = form.value.username
    const password = form.value.password
    this.validLogin = this.authService.loginUser(username, password)
    this.authService.loginUser(username, password)
  }
}