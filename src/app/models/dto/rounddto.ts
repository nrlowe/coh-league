export class RoundDto {
    matchs : string[] = [];
    roundId? : number;
    roundName? : string;
    date? : string;
    roundFormat? : number;
    constructor(roundId : number, roundName : string, date : string, roundFormat : number){
        this.roundId = roundId;
        this.roundName = roundName;
        this.date = date;
        this.roundFormat = roundFormat;
    }   
}