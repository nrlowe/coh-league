import { Component } from '@angular/core';
import { AuthService } from '../services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    loggedIn : boolean = false;
    user : string = '';
    constructor(private authService : AuthService, private router : Router){

    }
    ngOnInit(){
      this.authService.isLoggedInSubject.subscribe(status => {
        this.loggedIn = status;
      })
    }
}
