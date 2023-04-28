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
    private coh3Path = "/rankings/players/CoH2";
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

    getAllPlayers() : Observable<PlayerDetails[]> {
        return this.db.collection<PlayerDetails>(this.coh3Path, ref => ref.orderBy("points", "desc")).valueChanges();
        //return this.playerRef2.valueChanges();
    }

    async getAllPlayers2() : Promise<PlayerDetails[]> {
        const ref = this.playerRef2.get();
        await ref.forEach(doc => {
            doc.forEach(player => {
                var x = new PlayerDetails;
                x.playerName = player.data().playerName;
                x.steamId = player.data().steamId;
                x.points = player.data().points;
                this.playerDetails?.push(x);
            })
        });
        return this.playerDetails;
    }

    async addNewPlayer(player: PlayerDetails) {
        return this.playerRef2.add({ ...player });
    }

    // update(id: string, data: any): Promise<void> {
    //     return this.playerRef.doc(id).update(data);
    // }

    // delete(id: string): Promise<void> {
    //     return this.playerRef.doc(id).delete();
    // }
    
}