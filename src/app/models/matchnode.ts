import { GameDetails } from "./gameDetails";
import { PlayerDetails } from "./playerdetails";

export class MatchNode {
    teamOne? : PlayerDetails[];
    teamTwo? : PlayerDetails[];
    teamOneName? : string;
    teamTwoName? : string;
    teamSize? : number;
    parentMatchNode? : MatchNode;
    leftNode? : MatchNode;
    rightNode? : MatchNode;
    teamOneScore? : number;
    teamTwoScore? : number;
    gameFormat? : number;
    gameDetails? : GameDetails[];
    matchId? : number;
    teamView : boolean = false;
    hasWinner : boolean = false;
    winner? : Map<string, PlayerDetails[]>;
    constructor(teamOne : PlayerDetails[], teamTwo : PlayerDetails[]){
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
    }
}