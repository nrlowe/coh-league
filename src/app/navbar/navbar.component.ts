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
      this.router.events.subscribe(event => {
        if(event.constructor.name === "NavigationEnd"){
          this.loggedIn = this.authService.isLoggedIn;
          console.log(this.loggedIn);
        }
      })
      if(localStorage.getItem('isLoggedIn')){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
}
