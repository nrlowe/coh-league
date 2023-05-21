import { MatchNode } from "./matchnode";
import { RoundNode } from "./roundnode";

export class TournamentTree {
    title? : string;
    description? : string;
    rounds? : RoundNode[];
    matchTree? : MatchNode;
    teamSize? : number;
    gameFormat? : number;
    playerNumber? : number;
    gameVersion? : string;
    startDate? : string;
    endDate? : string;
    open? : boolean | false;
    liveStatus? : boolean | false;
    image? : string;
    displayImage: boolean = false;
    hasImage: boolean = false;
    creatorKey? : string;
    tournamentDocId? : string;
    imageFile? : ImageData;
    imageUrl : string = '';
    imageId : string = '';
}