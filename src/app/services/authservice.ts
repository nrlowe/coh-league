import { Injectable } from '@angular/core';    
import { ULogin } from '../models/dto/ulogin';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

    
@Injectable({    
   providedIn: 'root'    
})    
export class AuthService {    

    private dbPath = "/users";
    private user$ = new Observable<ULogin[]>;
    userRef: AngularFirestoreCollection<ULogin>;
    private userSub? : any;
    isLoggedIn = false;
    pp : Number = 0;
    constructor(private db: AngularFirestore) { 
        this.userRef = db.collection(this.dbPath);
    }   
    
    async retrieveUser(user : ULogin) {
        return this.db.collection<ULogin>(this.dbPath, ref => ref.where('userName', '==', user.userName!)
        .where('key', '==', user.key!).limit(1)).valueChanges();
        }
   
    logout() : void {    
            localStorage.setItem('isLoggedIn','false');    
            localStorage.clear;    
    }
    
    


}   