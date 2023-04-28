import { Injectable } from '@angular/core';
import { TournamentTree } from '../models/tournamenttree';
import { BehaviorSubject } from 'rxjs';
import { TournamentService } from './tournament.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class SharedTournamentService {
    public newTournamentTree = new BehaviorSubject(TournamentTree);
    public viewTournamentTree = new BehaviorSubject(TournamentTree);

    constructor(private tournamentService : TournamentService){

    }

    setNewTournament(data : any){
        this.newTournamentTree.next(data);
    }

    setViewTournament(data : any){
        if(data){
            this.viewTournamentTree.next(data);
        } else {
            
        }

    }

    getNewTournamentObject(){
        return this.newTournamentTree.asObservable();
    }

    getViewTournament(){
        return this.viewTournamentTree.asObservable();
    }

}