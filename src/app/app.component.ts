import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { Observable } from 'rxjs';
import { AuthService } from './services/authservice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coh-league';
  isLoggedIn$? : Observable<boolean>;

  constructor(private authService : AuthService,  private router : Router){

  }

  ngOnInit() {
    this.router.navigate(['tournament/viewedit']);
  }

  // if error kick out to error screen

  //user sessions
  
}
