import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tournament } from '../models/tournament';
import { BracketsManager } from 'brackets-manager';
import { TournamentDetails } from '../models/tournamentdetails';
import { MatchDetails } from '../models/matchdetails';
import { RoundDetails } from '../models/rounddetails';

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

    createNewTournament(title : String, players : number) : TournamentDetails{
        this.tournamentDetails = new TournamentDetails(title, this.createRoundItems(players));
        return this.tournamentDetails;
    }

    createRoundItems(players : number) : RoundDetails[] {
        var roundDetailsArray : RoundDetails[] = [];
        var roundId = 1;
        var counter = players/2;
        while(counter >= 1){
            var matchArray = this.createMatchs(roundId, 1, [], counter);
            roundDetailsArray.push(new RoundDetails(matchArray, roundId));
            roundId++;
            counter = counter/2;
        }
        //create final
        var finals = new MatchDetails(1, roundId);
        var finalArray = [finals];
        roundDetailsArray.push(new RoundDetails(finalArray, roundId));
        return roundDetailsArray;
    }

    createMatchs(roundId : number, matchId : number, matchArray : MatchDetails[], index : number) : MatchDetails[]{
        if(index > 0){
            index--;
            var match = new MatchDetails(matchId, roundId);
            matchArray.push(match);
            matchId++;
            this.createMatchs(roundId, matchId, matchArray, index);
        }
        return matchArray;
    }

    
}
