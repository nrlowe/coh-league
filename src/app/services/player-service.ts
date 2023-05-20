import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tournament } from '../models/tournament';
import { TournamentDetails } from '../models/tournamentdetails';
import { PlayerDetails } from '../models/playerdetails';
import { Observable } from 'rxjs';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
    private dbPath = '/players';
    private coh2Path = "/rankings/players/CoH2";
    private coh3Path = "/rankings/players/CoH3";
    playerRef3: AngularFirestoreCollection<PlayerDetails>;
    playerRef2: AngularFirestoreCollection<PlayerDetails>;
    tournamentDetails? : TournamentDetails;
    playerDetails : PlayerDetails[] = [];

    constructor(private db: AngularFirestore, private toastService : ToastService) {
        this.playerRef3 = db.collection<PlayerDetails>(this.coh2Path);
        this.playerRef2 = db.collection<PlayerDetails>(this.coh2Path);
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
        return this.db.collection<PlayerDetails>(this.coh2Path, ref => ref.orderBy("points", "desc")).valueChanges();
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

    async getAllPlayers3() : Promise<PlayerDetails[]> {
        const ref = this.playerRef3.get();
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

    async addNewPlayerCoH2(player: PlayerDetails) {
        const customIdRef = this.playerRef2.doc(player.steamId)
        customIdRef.get().subscribe((docSnapshot) => {
            if (docSnapshot.exists) {
              console.log('Document ID already exists, cannot add new document.');
              return;
            }
        
            // Document ID does not exist, proceed with saving the custom item
            customIdRef.set(Object.assign({},player))
              .then(() => {
                this.toastService.showSuccessToast("Player Added!", "Player Successfully Added to the COH-League Database");
              })
              .catch((error) => {
                console.error('Error saving custom item:', error);
              });
          });
    }

    async addNewPlayerCoH3(player: PlayerDetails) {
        const customIdRef = this.playerRef3.doc(player.steamId)
        customIdRef.get().subscribe((docSnapshot) => {
            if (docSnapshot.exists) {
              console.log('Document ID already exists, cannot add new document.');
              return;
            }
        
            // Document ID does not exist, proceed with saving the custom item
            customIdRef.set(player)
              .then(() => {
                console.log('Custom item saved successfully!');
              })
              .catch((error) => {
                console.error('Error saving custom item:', error);
              });
          });
    }

    // update(id: string, data: any): Promise<void> {
    //     return this.playerRef.doc(id).update(data);
    // }

    // delete(id: string): Promise<void> {
    //     return this.playerRef.doc(id).delete();
    // }
    
}