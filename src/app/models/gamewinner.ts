import { PlayerDetails } from "./playerdetails";

export class GameWinner{
    teamId : number;
    teamName : string;
    teamPlayers : PlayerDetails[] = [];

    constructor(teamName : string, players : PlayerDetails[], teamId : number){
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamPlayers = players;
    }
}