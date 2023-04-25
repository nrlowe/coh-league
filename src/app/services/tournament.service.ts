import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TournamentDetails } from '../models/tournamentdetails';
import { TournamentTree } from '../models/tournamenttree';
import { TournamentDto } from '../models/dto/tournamentdto';

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

    async getAllTournaments() : Promise<TournamentDto[]> {
        const ref = await this.tournamentRef.get();
        ref.forEach(doc => {
            doc.forEach(tournament => {
                var x = new TournamentDto(tournament.data().title!, tournament.data().teamSize!,
                tournament.data().playerNumber!,tournament.data().gameVersion!,tournament.data().open,
                tournament.data().hasImage);
                this.tournamentDtoList?.push(x);
            })
        });
        return this.tournamentDtoList;
      }
    
}
