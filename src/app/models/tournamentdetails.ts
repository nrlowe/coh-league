import { PlayerDetails } from "./playerdetails";
import { RoundDetails } from "./rounddetails";

export class TournamentDetails{
    //include id, name, player count, matchs(that coontain match number/etc), tournament status (open, upcoming, live, over), players(player info)
    title : String;
    players? : PlayerDetails[];
    rounds : RoundDetails[];
    playerNumber? : number;
    constructor(title : String, rounds : RoundDetails[]) {
        this.title = title;
        this.rounds = rounds;
    }
}