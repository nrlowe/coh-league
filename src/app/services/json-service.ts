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
    visited : Set<number> = new Set();

    //Nodes -> JSON
    jsonTournament(tournament : TournamentTree) : TournamentDto{
        //description, start date, enddate
        var tournamentDto = new TournamentDto(tournament.title!, tournament.teamSize!,
            tournament.playerNumber!, tournament.gameVersion!, tournament.open!,
            tournament.hasImage);
        console.log(tournament);
        tournamentDto.creatorKey = localStorage.getItem("userKey")!;
        tournamentDto.startDate = tournament.startDate;
        tournamentDto.endDate = tournament.endDate;
        if(tournament.hasImage){
            tournamentDto.image = tournament.image;
            tournamentDto.displayImage = tournament.displayImage;
        }
        for(let round of tournament.rounds!){
            var roundDto = this.convertRoundsToJson(round);
            tournamentDto.rounds.push(JSON.stringify(roundDto));
        }
        tournamentDto.matchTree = this.convertMatchTreeToJson(tournament.matchTree!);
        console.log(tournamentDto);
        return tournamentDto;
    }

    private convertRoundsToJson(round : RoundNode) : RoundDto{
        var roundDto = new RoundDto(round.roundId!, round.roundName!, round.date!, 3);
        for(let match of round.matchs){
            var matchdto = this.convertMatchInfoToMatchDto(match);
            roundDto.matchs.push(JSON.stringify(matchdto));
        }
        return roundDto;
    }

    private convertMatchNodeToJSON(node : MatchNode) : MatchDto{
        var dto = this.convertMatchInfoToMatchDto(node);
        dto.gameDetails = JSON.stringify(node.gameDetails);
        dto.teamOne = JSON.stringify(node.teamOne);
        dto.teamTwo = JSON.stringify(node.teamTwo);
        console.log(dto);
        return dto;
    }

    //Match Tree to JSON
    private convertMatchTreeToJson(matchTree : MatchNode) : string{
        var matchDto = this.convertMatchNodeToJSON(matchTree);
        matchDto.leftNode = this.checkNode(matchTree.leftNode!);
        matchDto.rightNode = this.checkNode(matchTree.rightNode!);
        return JSON.stringify(matchDto);
    }


    private convertMatchInfoToMatchDto(match : MatchNode) : MatchDto {
        var matchdto = new MatchDto(match.teamOneName!, match.teamTwoName!, match.teamOneScore!,
            match.teamTwoScore!, match.matchId!);
        matchdto.hasWinner = match.hasWinner;
        if(matchdto.hasWinner){
            matchdto.winner = JSON.stringify(match.winner)
        }
        return matchdto;
    }
    
    private checkNode(node : MatchNode) : string{
        var right = '';
        var left = '';
        if(node.rightNode != null && node.rightNode != undefined){
            if(!this.visited.has(node.rightNode.matchId!)){
                right = this.checkNode(node.rightNode);
            }
        }
        if(node.leftNode != null && node.leftNode != undefined){
            if(!this.visited.has(node.leftNode.matchId!)){
                left = this.checkNode(node.leftNode);
            }
        }
        var newMatchDto = this.convertMatchNodeToJSON(node)
        newMatchDto.leftNode = left;
        newMatchDto.rightNode = right;
        return JSON.stringify(newMatchDto);
    }


    //JSON -> Nodes
    public convertTournamentDtoToTree(tournamentDto : TournamentDto) : TournamentTree {
        var tournamentTree = new TournamentTree();
        tournamentTree.matchTree = this.convertJsonToMatchNode(tournamentDto.matchTree!);
        tournamentTree.creatorKey = tournamentDto.creatorKey;
        tournamentTree.displayImage = tournamentDto.displayImage;
        tournamentTree.endDate = tournamentDto.endDate;
        tournamentTree.gameVersion = tournamentDto.gameVersion;
        tournamentTree.hasImage = tournamentDto.hasImage;
        tournamentTree.liveStatus = tournamentDto.liveStatus;
        tournamentTree.open = tournamentDto.open;
        tournamentTree.playerNumber = tournamentDto.playerNumber;
        tournamentTree.rounds = this.convertRoundsDtoToRoundNodeArray(tournamentDto.rounds);
        tournamentTree.startDate = tournamentDto.startDate;
        tournamentTree.teamSize = tournamentDto.teamSize;
        tournamentTree.title = tournamentDto.title;
        if(tournamentDto.description){
            tournamentTree.description = tournamentDto.description;
        }
        return tournamentTree;
    }

    //Rounds Array JSON Conversion
    private convertRoundsDtoToRoundNodeArray(roundString : string[]) : RoundNode[] {
        var roundArray = [] as RoundNode[];
        for(var round of roundString){
            var parsedJsonMatchs = JSON.parse(round);
            console.log(parsedJsonMatchs);
            var matchNodeArray = [] as MatchNode[];
            parsedJsonMatchs.matchs.forEach((m : string) => {
                var node = JSON.parse(m) as MatchNode;
                console.log(m);
                matchNodeArray.push(node);
            })
            var node = new RoundNode(matchNodeArray);
            node.roundId = parsedJsonMatchs.roundId;
            node.roundFormat = parsedJsonMatchs.roundFormat;
            roundArray.push(node);
        }
        return roundArray;
    }

    //MatchTree JSON conversion 
    private convertJsonToMatchNode(jsonMatchNode : string) : MatchNode{
        var parsedJson = JSON.parse(jsonMatchNode) as MatchDto;
        var matchNode = this.setMatchNodeValuesWithParsedJSON(parsedJson);
        matchNode.leftNode = this.checkJSONMatchNode(JSON.parse(parsedJson.leftNode!));
        matchNode.rightNode = this.checkJSONMatchNode(JSON.parse(parsedJson.rightNode!));
        return matchNode;
    }

    private setMatchNodeValuesWithParsedJSON(parsedJson : MatchDto) : MatchNode{
        var matchNode = new MatchNode([],[]);
        matchNode.matchId = parsedJson.matchId;
        matchNode.teamOne = JSON.parse(parsedJson.teamOne!);
        matchNode.teamTwo =  JSON.parse(parsedJson.teamTwo!);
        matchNode.teamOneName = parsedJson.teamOneName;
        matchNode.teamTwoName = parsedJson.teamTwoName;
        matchNode.teamOneScore = parsedJson.teamOneScore;
        matchNode.teamTwoScore = parsedJson.teamTwoScore;
        matchNode.gameDetails = JSON.parse(parsedJson.gameDetails!);
        matchNode.matchId = parsedJson.matchId;
        matchNode.hasWinner = parsedJson.hasWinner!;
        if(matchNode.hasWinner){
            matchNode.winner =  JSON.parse(parsedJson.winner!);
        }
        return matchNode;
    }

    private checkJSONMatchNode(parsedJson : MatchDto) : MatchNode{
        var newMatchNode = this.setMatchNodeValuesWithParsedJSON(parsedJson);
        if(parsedJson.leftNode){
            newMatchNode.leftNode = this.checkJSONMatchNode(JSON.parse(parsedJson.leftNode));
        }
        if(parsedJson.rightNode){
            newMatchNode.rightNode = this.checkJSONMatchNode(JSON.parse(parsedJson.rightNode));
        }
        return newMatchNode;
    }

}