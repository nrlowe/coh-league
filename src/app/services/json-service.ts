import { Injectable } from '@angular/core';
import { TournamentTree } from '../models/tournamenttree';
import { TournamentDto } from '../models/dto/tournamentdto';
import { RoundNode } from '../models/roundnode';
import { RoundDto } from '../models/dto/rounddto';
import { MatchNode } from '../models/matchnode';
import { MatchDto } from '../models/dto/matchdto';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
    jsonTournament(tournament : TournamentTree) : TournamentDto{
        //description, start date, enddate
        var tournamentDto = new TournamentDto(tournament.title!, tournament.teamSize!,
            tournament.playerNumber!, tournament.gameVersion!, tournament.open!,
            tournament.hasImage);
        if(tournament.hasImage){
            tournamentDto.image = tournament.image;
            tournamentDto.displayImage = tournament.displayImage;
        }
        for(let round of tournament.rounds!){
            var roundDto = this.convertRoundsToJson(round);
            tournamentDto.rounds.push(JSON.stringify(roundDto));
        }
        tournamentDto.matchTree = this.convertMatchTreeToJson(tournament.matchTree!);
        return tournamentDto;
    }

    convertRoundsToJson(round : RoundNode) : RoundDto{
        var roundDto = new RoundDto(round.roundId!, round.roundName!, round.date!, 3);
        for(let match of round.matchs){
            var matchdto = this.convertMatchsToMatchDto(match);
            roundDto.matchs.push(JSON.stringify(matchdto));
        }
        return roundDto;
    }

    convertMatchsToMatchDto(match : MatchNode) : MatchDto {
        var matchdto = new MatchDto(match.teamOneName!, match.teamTwoName!, match.teamOneScore!,
            match.teamTwoScore!, match.matchId!);
        return matchdto;
    }
    
    convertMatchTreeToJson(matchTree : MatchNode) : string{
        var matchDto = this.convertMatchNodeToJSON(matchTree);
        matchDto.leftNode = this.checkLeftNode(matchTree);
        matchDto.rightNode = this.checkRightNode(matchTree);
        console.log(JSON.stringify(matchDto));
        return JSON.stringify(matchDto);
    }

    checkRightNode(node : MatchNode) : string{
        if(node.rightNode != null && node.rightNode != undefined){
            this.checkLeftNode(node.leftNode!);
        }
        return JSON.stringify(this.convertMatchNodeToJSON(node));
    }

    checkLeftNode(node : MatchNode) : string{
        if(node.leftNode != null && node.leftNode != undefined){
            this.checkLeftNode(node.leftNode);
        }
        this.checkRightNode(node);
        return JSON.stringify(this.convertMatchNodeToJSON(node));
    }

    convertMatchNodeToJSON(node : MatchNode) : MatchDto{
        var dto = this.convertMatchsToMatchDto(node);
        dto.gameDetails = JSON.stringify(node.gameDetails);
        dto.teamOne = JSON.stringify(node.teamOne);
        dto.teamTwo = JSON.stringify(node.teamTwo);
        return dto;
    }
}