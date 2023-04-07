import { GameDetails } from "./gameDetails";
import { PlayerDetails } from "./playerdetails";

export class MatchNode {
    teamOne? : PlayerDetails[];
    teamTwo? : PlayerDetails[];
    parentMatchNode? : MatchNode;
    leftNode? : MatchNode;
    rightNode? : MatchNode;
    teamOneScore? : number;
    teamTwoScore? : number;
    gameDetails? : GameDetails[];
}