import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tournament } from '../models/tournament';
import { TournamentDetails } from '../models/tournamentdetails';
import { PlayerDetails } from '../models/playerdetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
    private dbPath = '/players';
    private coh3Path = "players/rEh8a5JfD3HZUSQ1ZckS/CoH3";
    playerRef$: Observable<any[]>;
    playerRef2: AngularFirestoreCollection<PlayerDetails>;
    tournamentDetails? : TournamentDetails;
    playerDetails : PlayerDetails[] = [];

    constructor(private db: AngularFirestore) {
        this.playerRef$ = db.collection(this.coh3Path).valueChanges();
        this.playerRef2 = db.collection(this.coh3Path);
    }

    // getAllPlayersBasedOnGameVersion(gameVersion : string) : {

    // }

    //save tournament + tournament details at the same time
    // async getAll() {
    //     const ref = await this.playerRef2.get();
    //     ref.forEach(doc => {
    //         console.log(doc.id, '=>', doc.data())
    //     });
    //     return ref;
    // }

    async getAll2() : Promise<PlayerDetails[]> {
        const ref = await this.playerRef2.get();
        ref.forEach(doc => {
            doc.forEach(player => {
                var x = new PlayerDetails;
                x.name = player.data().name;
                x.steamId = player.data().steamId;
                x.points = player.data().points;
                this.playerDetails?.push(x);
            })
        });
        return this.playerDetails;
      }

    // create(tutorial: PlayerDetails): any {
    //     return this.playerRef.add({ ...tutorial });
    // }

    // update(id: string, data: any): Promise<void> {
    //     return this.playerRef.doc(id).update(data);
    // }

    // delete(id: string): Promise<void> {
    //     return this.playerRef.doc(id).delete();
    // }
    
}