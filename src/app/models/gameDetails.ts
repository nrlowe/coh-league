import { GameWinner } from "./gamewinner";

export class GameDetails{
    teamOne? : string;
    teamTwo? : string;
    gameNum : number;
    scoreOne? : number;
    scoreTwo? : number;
    gameWinner? : GameWinner;

    constructor(gameNum : number){
        this.gameNum = gameNum;
    }
}