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
    constructor(teamOneName: string, teamTwoName : string,
       teamOneScore : number, teamTwoScore : number, matchId : number){
            this.teamOneName = teamOneName;
            this.teamTwoName = teamTwoName;
            this.teamOneScore = teamOneScore;
            this.teamTwoScore = teamTwoScore;
            this.matchId = matchId;
    }
}