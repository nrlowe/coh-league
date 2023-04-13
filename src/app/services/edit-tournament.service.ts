import { Injectable } from '@angular/core';
import { MatchNode } from '../models/matchnode';
import { RoundNode } from '../models/roundnode';
import { Tournament } from '../models/tournament';
import { TournamentTree } from '../models/tournamenttree';
import { TournamentDetails } from '../models/tournamentdetails';

@Injectable({
  providedIn: 'root'
})
export class EditTournamentService {
    

    constructor() {

    }  

    createNewTournament(newTournament : TournamentDetails) : TournamentTree{
        return this.createTournamentRounds(newTournament);
    }

    private createTournamentRounds(newTournament : TournamentDetails) : TournamentTree{
        var tournamentTree = new TournamentTree;
        var numberOfRounds = Math.log2(newTournament.playerNumber);
        var roundsArray = this.createRound(numberOfRounds);
        tournamentTree.rounds = roundsArray;
        tournamentTree.matchTree = tournamentTree.rounds[0].matchs[0];
        console.log(tournamentTree.matchTree);
        return tournamentTree;

    }

    private createRound(roundNum : number, ) : RoundNode[]{
        var headRoundNode = this.createHeadRoundAndMatchNodes(roundNum);
        roundNum--;
        var nodeArray = [headRoundNode];
        return this.createNextRound(roundNum, headRoundNode, nodeArray);
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

    private createNextRound(roundNumber : number, parentRoundNode : RoundNode, 
        nodearray : RoundNode[]) : RoundNode[]{
        if(roundNumber > 0){
            roundNumber--;
            var newRound = new RoundNode([]);
            newRound.roundId = roundNumber;
            newRound.matchs = this.addMatch(parentRoundNode);
            parentRoundNode.previousRound = newRound;
            newRound.nextRound = parentRoundNode;
            nodearray.push(newRound);
            this.createNextRound(roundNumber, newRound, nodearray);
        }
        return nodearray;
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
        newMatch.teamOneScore = 0;
        newMatch.teamTwoScore = 2;
        newMatch.parentMatchNode = parentNode;
        return newMatch;
    }


    
}
