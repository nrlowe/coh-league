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
    parentNodeFound? : boolean;
    matchNodeSide? : number;
    
    findParentNode(matchNode : MatchNode, tree : MatchNode) {
        this.parentNodeFound = false;
        this.checkNode(matchNode, tree);
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
}