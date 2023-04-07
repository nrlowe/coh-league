import { RoundNode } from "./roundnode";

export class TournamentTree {
    //include id, name, player count, matchs(that coontain match number/etc), tournament status (open, upcoming, live, over), players(player info)
    title? : string;
    description? : string;
    rounds? : RoundNode;
    playerNumber? : number;
    
}