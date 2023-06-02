import { Injectable } from '@angular/core';
import { TournamentTree } from '../models/tournamenttree';
import { TournamentDto } from '../models/dto/tournamentdto';
import { RoundNode } from '../models/roundnode';
import { RoundDto } from '../models/dto/rounddto';
import { MatchNode } from '../models/matchnode';
import { MatchDto } from '../models/dto/matchdto';
import { PlayerDetails } from '../models/playerdetails';

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
        tournamentDto.creatorKey = localStorage.getItem("userKey")!;
        tournamentDto.startDate = tournament.startDate;
        tournamentDto.endDate = tournament.endDate;
        if(tournament.hasImage){
            tournamentDto.hasImage = true;
            tournamentDto.displayImage = tournament.displayImage;
        }
        for(let round of tournament.rounds!){
            var roundDto = this.convertRoundsToJson(round);
            tournamentDto.rounds.push(JSON.stringify(roundDto));
        }
        tournamentDto.matchTree = this.convertMatchTreeToJson(tournament.matchTree!);
        return tournamentDto;
    }

    private convertRoundsToJson(round : RoundNode) : RoundDto{
        var roundDto = new RoundDto(round.roundId!, round.roundName!, round.date!, 3);
        return roundDto;
    }

    private convertMatchNodeToJSON(node : MatchNode) : MatchDto{
        var dto = this.convertMatchInfoToMatchDto(node);
        dto.gameDetails = JSON.stringify(node.gameDetails);
        dto.teamOne = JSON.stringify(node.teamOne);
        dto.teamTwo = JSON.stringify(node.teamTwo);
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
            match.teamTwoScore!, match.matchId!, match.roundId!, match.allowEdits);
        matchdto.hasWinner = match.hasWinner;
        if(matchdto.hasWinner){
            matchdto.winner = JSON.stringify(match.winner)
            matchdto.teamOneWin = match.teamOneWin;
            matchdto.teamTwoWin = match.teamTwoWin;
        }
        return matchdto;
    }
    
    private checkNode(node : MatchNode) : string{
        var right = '';
        var left = '';
        if(node.leftNode != null && node.leftNode != undefined){
           
                left = this.checkNode(node.leftNode);
            
        }
        if(node.rightNode != null && node.rightNode != undefined){
            
                right = this.checkNode(node.rightNode);
        
        }
        var newMatchDto = this.convertMatchNodeToJSON(node)
        if(left != ''){
            newMatchDto.leftNode = left;
        }
        if(right != ''){
            newMatchDto.rightNode = right;
        }
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
        if(tournamentTree.hasImage){
            tournamentTree.imageId = tournamentDto.imageId!;
        }
        tournamentTree.liveStatus = tournamentDto.liveStatus;
        tournamentTree.open = tournamentDto.open;
        tournamentTree.playerNumber = tournamentDto.playerNumber;
        tournamentTree.rounds = this.convertRoundsDtoToRoundNodeArray(tournamentDto.rounds, tournamentTree);
        tournamentTree.startDate = tournamentDto.startDate;
        tournamentTree.teamSize = tournamentDto.teamSize;
        tournamentTree.title = tournamentDto.title;
        tournamentTree.tournamentDocId = tournamentDto.documentId;
        if(tournamentDto.description){
            tournamentTree.description = tournamentDto.description;
        }
        return tournamentTree;
    }

    //Rounds Array JSON Conversion
    private convertRoundsDtoToRoundNodeArray(roundString : string[], tournamentTree : TournamentTree) : RoundNode[] {
        var roundArray = [] as RoundNode[];
        var matchsPerRoundMap = this.placeMatchInRoundMap(tournamentTree);
        for(var round of roundString){
            var parsedJsonMatchs = JSON.parse(round);
            var matchNodeArray = matchsPerRoundMap.get(parsedJsonMatchs.roundId) as MatchNode[];
            var node = new RoundNode(matchNodeArray);
            node.roundId = parsedJsonMatchs.roundId;
            node.roundFormat = parsedJsonMatchs.roundFormat;
            roundArray.push(node);
        }
        return roundArray;
    }

    private placeMatchInRoundMap(tournamentTree : TournamentTree) : Map<number, MatchNode[]>{
        var matchsPerRoundMap = new Map<number, MatchNode[]>;
        var startNode = tournamentTree.matchTree;
        var matchArray = [] as MatchNode[];
        matchArray.push(this.createNewMiniMatchNode(startNode!));
        matchsPerRoundMap.set(startNode!.roundId!, matchArray);
        this.checkNextNode(startNode!, matchsPerRoundMap);
        return matchsPerRoundMap;
        // parsedJsonMatchs.matchs.forEach((m : string) => {
        //     var node = JSON.parse(m) as MatchNode;
        //     matchNodeArray.push(node);
        // })
    }

    private createNewMiniMatchNode(tree : MatchNode) : MatchNode {
        var mini = new MatchNode([],[]);
        mini.matchId = tree.matchId;
        mini.teamOne = tree.teamOne!;
        mini.teamTwo =  tree.teamTwo!;
        mini.teamOneName = tree.teamOneName;
        mini.teamTwoName = tree.teamTwoName;
        mini.teamOneScore = tree.teamOneScore;
        mini.teamTwoScore = tree.teamTwoScore;
        mini.gameDetails = tree.gameDetails!;
        mini.matchId = tree.matchId;
        mini.hasWinner = tree.hasWinner!;
        mini.roundId = tree.roundId;
        mini.allowEdits = tree.allowEdits;
        mini.teamOneWin = tree.teamOneWin;
        mini.teamTwoWin = tree.teamTwoWin;
        if(tree.hasWinner){
            mini.winner =  tree.winner!;
        }
        return mini;
    }

    private checkNextNode(tree : MatchNode, map : Map<number, MatchNode[]>) {
        if(tree.leftNode){
            this.addNodeToMap(tree.leftNode, map);
            this.checkNextNode(tree.leftNode, map);
        }  
        if (tree.rightNode) {
            this.addNodeToMap(tree.rightNode, map);
            this.checkNextNode(tree.rightNode, map);
        }
    }

    private addNodeToMap(node : MatchNode, map : Map<number, MatchNode[]>) {
        if(map.get(node.roundId!)){
            var array = map.get(node.roundId!);
            array?.push(this.createNewMiniMatchNode(node));
        } else {
            var newarray = [] as MatchNode[];
            newarray.push(node);
            map.set(node.roundId!, newarray);
        }
    }

    //MatchTree JSON conversion 
    private convertJsonToMatchNode(jsonMatchNode : string) : MatchNode{
        var parsedJson = JSON.parse(jsonMatchNode) as MatchDto;
        var matchNode = this.setMatchNodeValuesWithParsedJSON(parsedJson) as MatchNode;
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
        matchNode.roundId = parsedJson.roundId;
        matchNode.allowEdits = parsedJson.allowEdits!;
        matchNode.teamOneWin = parsedJson.teamOneWin;
        matchNode.teamTwoWin = parsedJson.teamTwoWin;
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