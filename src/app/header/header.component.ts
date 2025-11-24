import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  loggedIn = false

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.loggedIn = this.authService.loggedIn


  }

  onLogout() {
    this.authService.logout()
  }
}
