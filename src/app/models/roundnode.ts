import { MatchNode } from "./matchnode";

export class RoundNode {
    matchs : MatchNode[];
    nextRound? : RoundNode;
    previousRound? : RoundNode;
    roundId? : number;
    roundName? : string;
    date? : string;
    roundFormat? : number;
    constructor(matchs : MatchNode[]){
        this.matchs = matchs;
    }
}