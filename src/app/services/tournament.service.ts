import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TournamentDetails } from '../models/tournamentdetails';
import { TournamentTree } from '../models/tournamenttree';
import { TournamentDto } from '../models/dto/tournamentdto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
    private dbPath = '/tournamentdetails';
    tournamentRef: AngularFirestoreCollection<TournamentDto>;
    tournamentDetails? : TournamentDetails;
    tournamentDtoList : TournamentDto[] = [];

    constructor(private db: AngularFirestore) {
        this.tournamentRef = db.collection(this.dbPath);
    }
    //save tournament + tournament details at the same time
    

    create(tutorial: TournamentDto): any {
        return this.tournamentRef.add({... tutorial
        });
    }

    update(id: string, data: any): Promise<void> {
        return this.tournamentRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.tournamentRef.doc(id).delete();
    }

    getAllTournaments() : Observable<TournamentDto[]> {
        return this.db.collection<TournamentDto>(this.dbPath).valueChanges();
    }
    
}
