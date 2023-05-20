import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { Observable } from 'rxjs';
import { AuthService } from './services/authservice';
import { ToastService } from './services/toast-service';
import { EventTypes } from './models/events/eventtypes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coh-league';
  isLoggedIn$? : Observable<boolean>;
  EventTypes = EventTypes;

  constructor(private authService : AuthService,  private router : Router, private toastService : ToastService){

  }

  ngOnInit() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // if error kick out to error screen

  //user sessions

  
}
