import { MatchDetails } from "./matchdetails";

export class RoundDetails {
    roundMatchs : MatchDetails[];
    roundId : number;
    constructor(roundMatchs : MatchDetails[], roundId : number){
        this.roundMatchs = roundMatchs;
        this.roundId = roundId
    }

}