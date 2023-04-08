import { Injectable } from '@angular/core';
import { TournamentTree } from '../models/tournamenttree';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class SharedTournamentService {
    public newTournamentTree = new BehaviorSubject(TournamentTree);

    constructor(){

    }

    setNewTournament(data : any){
        this.newTournamentTree.next(data);
    }

    getNewTournamentObject(){
        return this.newTournamentTree.asObservable();
    }

}