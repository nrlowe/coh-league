import { Injectable } from '@angular/core';
import { MatchNode } from '../models/matchnode';
import { RoundNode } from '../models/roundnode';
import { Tournament } from '../models/tournament';
import { TournamentTree } from '../models/tournamenttree';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
    

    constructor() {

    }  
    //edit round names? edit match names? 
    createNewTournament(newTournament : Tournament) : TournamentTree{
        var tournamenttree = new TournamentTree();
        this.createTournamentRounds(tournamenttree, newTournament);
        return tournamenttree;
    }

    createTournamentRounds(tree : TournamentTree, newTournament : Tournament){
        var numberOfRounds = Math.log2(newTournament.players);
        this.createRound(numberOfRounds);

    }

    createRound(roundNum : number, ){
        var headRoundNode = this.createHeadRoundAndMatchNodes(roundNum);
        this.createNextRound(roundNum, headRoundNode);
    }

    createHeadRoundAndMatchNodes(roundNum : number) : RoundNode {
        var roundNode = new RoundNode();
        roundNode.roundId = roundNum;
        var finalMatch = new MatchNode();
        var matchArray = [];
        matchArray.push(finalMatch);
        roundNode.matchs = matchArray;
        return roundNode;
    }

    createNextRound(roundNumber : number, headRoundNode : RoundNode){
        if(roundNumber > 0){
            var newRound = new RoundNode;
            headRoundNode.previousRound = newRound;
            newRound.nextRound = headRoundNode;
            roundNumber--;
            this.createNextRound(roundNumber, newRound);
        }
    }

    addeMatch() : MatchNode[]{
        return [];
    }

    creatMatch() : MatchNode{
        return new MatchNode;
    }


    
}
