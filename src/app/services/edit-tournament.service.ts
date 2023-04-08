import { Injectable } from '@angular/core';
import { MatchNode } from '../models/matchnode';
import { RoundNode } from '../models/roundnode';
import { Tournament } from '../models/tournament';
import { TournamentTree } from '../models/tournamenttree';

@Injectable({
  providedIn: 'root'
})
export class EditTournamentService {
    

    constructor() {

    }  
    //edit round names? edit match names? 
    createNewTournament(newTournament : Tournament) : TournamentTree{
        var tournamenttree = new TournamentTree();
        this.createTournamentRounds(tournamenttree, newTournament);
        return tournamenttree;
    }

    private createTournamentRounds(tree : TournamentTree, newTournament : Tournament){
        var numberOfRounds = Math.log2(newTournament.players);
        this.createRound(numberOfRounds);

    }

    private createRound(roundNum : number, ){
        var headRoundNode = this.createHeadRoundAndMatchNodes(roundNum);
        this.createNextRound(roundNum, headRoundNode);
    }

    private createHeadRoundAndMatchNodes(roundNum : number) : RoundNode {
        var roundNode = new RoundNode([]);
        roundNode.roundId = roundNum;
        var finalMatch = new MatchNode();
        var matchArray = [];
        matchArray.push(finalMatch);
        roundNode.matchs = matchArray;
        return roundNode;
    }

    private createNextRound(roundNumber : number, parentRoundNode : RoundNode){
        if(roundNumber > 0){
            var newRound = new RoundNode([]);
            newRound.matchs = this.addMatch(parentRoundNode);
            parentRoundNode.previousRound = newRound;
            newRound.nextRound = parentRoundNode;
            roundNumber--;
            this.createNextRound(roundNumber, newRound);
        }
    }

    private addMatch(parentRoundNode : RoundNode) : MatchNode[]{
        var roundMatchs = [];
        for(var node of parentRoundNode.matchs){
            node.leftNode = this.creatMatch(node);
            node.rightNode = this.creatMatch(node);
            roundMatchs.push(node.leftNode);
            roundMatchs.push(node.rightNode);
        }
        return roundMatchs;
    }

    private creatMatch(parentNode : MatchNode) : MatchNode{
        var newMatch = new MatchNode();
        newMatch.parentMatchNode = parentNode;
        return newMatch;
    }


    
}
