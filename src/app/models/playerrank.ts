export class PlayerRank{
    playerId : Number;
    playerName : String;
    points : Number
    constructor(playerId : Number, playerName : String, points: Number){
        this.playerId = playerId;
        this.playerName = playerName;
        this.points = points;
    }
}