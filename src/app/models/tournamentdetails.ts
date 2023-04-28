import { PlayerDetails } from "./playerdetails";
import { RoundDetails } from "./rounddetails";

export class TournamentDetails{
    //include id, name, player count, matchs(that coontain match number/etc), tournament status (open, upcoming, live, over), players(player info)
    title : string;
    description? : string;
    teamSize : number;
    gameFormat : number;
    playerNumber : number;
    gameVersion : string;
    startDate? : string;
    endDate? : string;
    open : boolean;
    liveStatus : boolean = false;

    constructor(title : string, teamSize : number, gameFormat : number, playerNumber : number, 
        gameVersion : string, open : boolean){
            this.title = title;
            this.teamSize = teamSize;
            this.gameVersion = gameVersion;
            this.gameFormat = gameFormat;
            this.playerNumber = playerNumber;
            this.open = open;

    }
}