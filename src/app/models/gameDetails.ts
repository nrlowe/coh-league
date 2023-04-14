export class GameDetails{
    teamOne? : string;
    teamTwo? : string;
    gameNum : number;
    scoreOne? : number;
    scoreTwo? : number;
    gameWinner? : string;

    constructor(gameNum : number){
        this.gameNum = gameNum;
    }
}