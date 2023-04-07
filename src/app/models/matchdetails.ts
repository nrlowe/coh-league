export class MatchDetails {
    teamOne? : String;
    teamTwo? : String;
    mathdId : number;
    roundId : number;
    teamOneScore? : number;
    teamTwoScore? : number;
    games? : [];
    constructor(matchId : number, roundId : number){
        this.mathdId = matchId;
        this.roundId = roundId;
    }
}