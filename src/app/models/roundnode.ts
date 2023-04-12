import { MatchNode } from "./matchnode";

export class RoundNode {
    matchs : MatchNode[];
    nextRound? : RoundNode;
    previousRound? : RoundNode;
    roundId? : number;
    roundName? : string;
    date? : string;
    constructor(matchs : MatchNode[]){
        this.matchs = matchs;
    }
}