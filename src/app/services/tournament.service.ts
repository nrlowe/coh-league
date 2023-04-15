import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tournament } from '../models/tournament';
import { TournamentDetails } from '../models/tournamentdetails';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
    private dbPath = '/tournament';
    tournamentRef: AngularFirestoreCollection<Tournament>;
    tournamentDetails? : TournamentDetails;

    constructor(private db: AngularFirestore) {
        this.tournamentRef = db.collection(this.dbPath);


    }
    //save tournament + tournament details at the same time
    getAll(): AngularFirestoreCollection<Tournament> {
        return this.tournamentRef;
    }

    create(tutorial: Tournament): any {
        return this.tournamentRef.add({ ...tutorial });
    }

    update(id: string, data: any): Promise<void> {
        return this.tournamentRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.tournamentRef.doc(id).delete();
    }
    
}
