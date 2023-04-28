import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';  
import { ULogin } from '../models/dto/ulogin';  
import { AuthService } from '../services/authservice'; 
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;
  message?: string;  
  returnUrl?: string;  
  user : ULogin = new ULogin();
  userSub : ULogin[] = [];
  varvar : Number = 0;
    constructor(private formBuilder : FormBuilder,  
      private router : Router,  
      private authService : AuthService){
        this.loginForm = new FormGroup({
          userId : new FormControl('',[Validators.required]),
          token : new FormControl('', [Validators.required])
        })
      }

      ngOnInit() {  
        if(localStorage.getItem('isLoggedIn')){
          this.authService.isLoggedIn = false;
          localStorage.clear();
          this.router.navigate(["/frontpage"]); 
        }
      } 

      get f() { return this.loginForm!.controls; }  

       async login() {  
        if (this.loginForm!.valid) { 
          this.user.userName = this.loginForm.get('userId')!.value;
          this.user.key = this.loginForm.get('token')!.value;
          var y = await this.authService.retrieveUser(this.user);
          var x = y.pipe(map(changes => changes.map(c => ({
            userName : c.userName, key : c.key, documentId : c['Document ID']
        })))).subscribe(data => {
            if(data){
              localStorage.setItem('isLoggedIn', "true");  
              localStorage.setItem('userId', data[0].userName!);
              localStorage.setItem('userKey', data[0].documentId);
              this.authService.isLoggedIn = true;
              this.router.navigate(["/frontpage"]);
            };
        })
            
        }  
      }
      
      onNoClick(){
        this.router.navigate(['/'])
      }
}
