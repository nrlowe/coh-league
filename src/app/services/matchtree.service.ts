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
export class MatchTreeService {

    parentNode? : MatchNode;
    parentNodeFound : boolean = false;
    matchNodeFound : boolean = false;
    matchNodeSide? : number;
    
    findParentNode(matchNode : MatchNode, tree : MatchNode) {
        this.parentNodeFound = false;
        if(matchNode.matchId == tree.matchId){
            return ([0, this.parentNode])
        }
        this.checkNode(matchNode, tree);
        this.parentNodeFound = false;
        return ([this.matchNodeSide, this.parentNode]);
    }

    private checkNode(matchNode : MatchNode, treenode : MatchNode){
        if(treenode.leftNode && !this.parentNodeFound){
            var leftNode = treenode.leftNode;
            if(leftNode.matchId == matchNode.matchId){
                this.parentNode = treenode;
                this.parentNodeFound = true;
                this.matchNodeSide = 1;
            } else {
                this.checkNode(matchNode, leftNode);
            }
        } 
        if(treenode.rightNode && !this.parentNodeFound){
            var rightNode = treenode.rightNode;
            if(rightNode.matchId == matchNode.matchId){
                this.parentNode = treenode;
                this.parentNodeFound = true;
                this.matchNodeSide = 2;
            } else {
                this.checkNode(matchNode, rightNode);
            }
        }
    }

    updateTreeWithResult (node : MatchNode, tree : MatchNode) {
        var updatedResults = new MatchNode(node.teamOne!, node.teamTwo!);
        updatedResults.teamOneName = node.teamOneName;
        updatedResults.teamTwoName = node.teamTwoName;
        updatedResults.teamOneScore = node.teamOneScore;
        updatedResults.teamTwoScore = node.teamTwoScore;
        updatedResults.gameDetails = node.gameDetails;
        updatedResults.matchId = node.matchId;
        updatedResults.hasWinner = node.hasWinner;
        if(updatedResults.hasWinner){
            updatedResults.winner = node.winner;
            updatedResults.teamOneWin = node.teamOneWin;
            updatedResults.teamTwoWin = node.teamTwoWin;
        } else {
            updatedResults.hasWinner = false;
            updatedResults.winner = undefined;
            updatedResults.teamOneWin = false;
            updatedResults.teamTwoWin = false;
        }
        updatedResults.allowEdits = node.allowEdits;
        updatedResults.roundId = node.roundId;
        if(node.matchId == tree.matchId){
            this.updateGraphTreeResult(tree, updatedResults);
            this.matchNodeFound = true;
        }
        this.findMatchNode(updatedResults, tree);
        this.matchNodeFound = false;
    }

    private findMatchNode(updatedResults : MatchNode, tree : MatchNode){
        if(tree.matchId == updatedResults.matchId && !this.matchNodeFound) {
            this.updateGraphTreeResult(tree, updatedResults);
        }
        if(tree.leftNode && !this.matchNodeFound){
            
            this.findMatchNode(updatedResults, tree.leftNode);
            
        } 
        if(tree.rightNode && !this.matchNodeFound){
            
            this.findMatchNode(updatedResults, tree.rightNode);
            
        }
    }

    private updateGraphTreeResult(tree : MatchNode, updatedResults : MatchNode) {
        tree.teamOneName = updatedResults.teamOneName;
        tree.teamTwoName = updatedResults.teamTwoName;
        tree.teamOneScore = updatedResults.teamOneScore;
        tree.teamTwoScore = updatedResults.teamTwoScore;
        tree.gameDetails = updatedResults.gameDetails;
        tree.matchId = updatedResults.matchId;
        tree.hasWinner = updatedResults.hasWinner;
        if(updatedResults.hasWinner){
            tree.winner = updatedResults.winner;
            tree.teamOneWin = updatedResults.teamOneWin;
            tree.teamTwoWin = updatedResults.teamTwoWin;
        } else {
            tree.hasWinner = false;
            tree.winner = undefined;
            tree.teamOneWin = false;
            tree.teamTwoWin = false;

        }
        tree.allowEdits = updatedResults.allowEdits;
        tree.roundId = updatedResults.roundId;
    }
}