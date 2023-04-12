import { GameDetails } from "./gameDetails";
import { PlayerDetails } from "./playerdetails";

export class MatchNode {
    teamOne? : PlayerDetails[];
    teamTwo? : PlayerDetails[];
    teamSize? : number;
    parentMatchNode? : MatchNode;
    leftNode? : MatchNode;
    rightNode? : MatchNode;
    teamOneScore? : number;
    teamTwoScore? : number;
    gameFormat? : number;
    gameDetails? : GameDetails[];
}