import { Injectable } from '@angular/core';
import { MatchNode } from '../models/matchnode';
import { RoundNode } from '../models/roundnode';
import { Tournament } from '../models/tournament';
import { TournamentTree } from '../models/tournamenttree';
import { TournamentDetails } from '../models/tournamentdetails';
import { GameDetails } from '../models/gameDetails';
import { PlayerDetails } from '../models/playerdetails';

@Injectable({
  providedIn: 'root'
})
export class EditTournamentService {
    

    constructor() {

    }  

    private gameFormat : number = 0;
    private teamSize : number = 0;
    private globalMatchCount : number = 1;

    createNewTournament(newTournament : TournamentDetails) : TournamentTree{
        this.gameFormat = newTournament.gameFormat;
        this.teamSize = newTournament.teamSize;
        var tournamentTree = this.createTournamentRounds(newTournament);
        return this.finalizeTournamentTree(tournamentTree, newTournament);
    }

    private createTournamentRounds(newTournament : TournamentDetails) : TournamentTree{
        var tournamentTree = new TournamentTree;
        var numberOfRounds = Math.log2(newTournament.playerNumber);
        var roundsArray = this.createRound(numberOfRounds);
        tournamentTree.rounds = roundsArray;
        tournamentTree.matchTree = tournamentTree.rounds[0].matchs[0];
        var reversedRounds = tournamentTree.rounds.reverse();
        tournamentTree.rounds = reversedRounds;
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
        var finalMatch = new MatchNode([],[]);
        var matchArray = [];
        finalMatch.teamSize = this.teamSize;
        finalMatch.teamOneName = "TBD";
        finalMatch.teamTwoName = "TBD";
        finalMatch.teamOneScore = 0;
        finalMatch.teamTwoScore = 0;
        finalMatch.matchId = this.globalMatchCount;
        console.log(this.globalMatchCount);
        this.globalMatchCount++;
        this.addGameDetails(finalMatch);
        for(var i = 1; i <= this.teamSize; i++){
            var player = new PlayerDetails;
            player.playerName = "Player " + i;
            finalMatch.teamOne?.push();
            finalMatch.teamTwo?.push();
        }
        matchArray.push(finalMatch);
        roundNode.matchs = matchArray;
        return roundNode;
    }

    private createNextRound(roundNumber : number, parentRoundNode : RoundNode, 
        nodearray : RoundNode[]) : RoundNode[]{
        if(roundNumber > 0){
            var newRound = new RoundNode([]);
            newRound.roundId = roundNumber;
            roundNumber--;
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
            node.leftNode = this.creatMatch();
            node.rightNode = this.creatMatch();
            roundMatchs.push(node.leftNode);
            roundMatchs.push(node.rightNode);
        }
        return roundMatchs;
    }

    private creatMatch() : MatchNode{
        var newMatch = new MatchNode([],[]);
        newMatch.teamSize = this.teamSize;
        newMatch.teamOneName = "TBD";
        newMatch.teamTwoName = "TBD";
        newMatch.teamOneScore = 0;
        newMatch.teamTwoScore = 0;
        newMatch.matchId = this.globalMatchCount;
        this.globalMatchCount++;
        for(var i = 1; i <= this.teamSize; i++){
            var player = new PlayerDetails;
            player.playerName = "Player " + i;
            newMatch.teamOne?.push();
            newMatch.teamTwo?.push();
        }
        return this.addGameDetails(newMatch);
    }

    private addGameDetails(match : MatchNode) : MatchNode{
        var gameDetailsArray = [];
        for(var i = 0; i < this.gameFormat; i++){
            gameDetailsArray.push(new GameDetails(i + 1));
        }
        match.gameDetails = gameDetailsArray;
        return match;
    }

    private finalizeTournamentTree(tournamentTree : TournamentTree, 
        tournamentDetails : TournamentDetails) : TournamentTree{
        tournamentTree.title = tournamentDetails.title;
        if(tournamentDetails.description != undefined){
            tournamentTree.description = tournamentDetails.description;
        }
        tournamentTree.teamSize = tournamentDetails.teamSize;
        tournamentTree.gameFormat = tournamentDetails.gameFormat;
        tournamentTree.playerNumber = tournamentDetails.playerNumber;
        tournamentTree.gameVersion = tournamentDetails.gameVersion;
        tournamentTree.open = tournamentDetails.open;
        return tournamentTree;
    }


    
}
