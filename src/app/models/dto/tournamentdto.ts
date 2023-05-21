export class TournamentDto{
    title? : string;
    description? : string;
    rounds : string[] = [];
    matchTree? : string;
    teamSize? : number;
    playerNumber? : number;
    gameVersion? : string;
    startDate? : string;
    endDate? : string; 
    open : boolean | false;
    image? : string;
    displayImage: boolean = false;
    hasImage: boolean = false;
    creatorKey? : string;
    liveStatus : boolean = false;
    documentId? : string;
    imageId: string = '';

    constructor(title : string, teamSize : number, playerNumber : number,
        gameVersion : string, open : boolean, hasImage : boolean) {
            this.title = title;
            this.teamSize = teamSize;
            this.playerNumber = playerNumber;
            this.gameVersion = gameVersion;
            this.open = open;
            this.hasImage = hasImage;
    }
}
