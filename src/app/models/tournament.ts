export class Tournament {
    id?: string;
    title?: string;
    description? : string;
    game?: string;
    startdate?: string;
    enddate?: string;
    open?: boolean;
    players : number;
    constructor(players : number) {
        this.players = players;
    }
}