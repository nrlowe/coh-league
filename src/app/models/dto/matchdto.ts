import { GameDetails } from "../gameDetails";
import { PlayerDetails } from "../playerdetails";

export class MatchDto {
    teamOne? : string;
    teamTwo? : string;
    teamOneName? : string;
    teamTwoName? : string;
    parentMatchNode? : string;
    leftNode? : string;
    rightNode? : string;
    teamOneScore? : number;
    teamTwoScore? : number;
    gameDetails? : string;
    matchId? : number;
    winner? : string;
    hasWinner? : boolean;
    roundId? : number;
    allowEdits? : boolean;
    constructor(teamOneName: string, teamTwoName : string,
       teamOneScore : number, teamTwoScore : number, matchId : number, roundId : number, allowEdits : boolean){
            this.teamOneName = teamOneName;
            this.teamTwoName = teamTwoName;
            this.teamOneScore = teamOneScore;
            this.teamTwoScore = teamTwoScore;
            this.matchId = matchId;
            this.roundId = roundId;
            this.allowEdits = allowEdits;
    }
}