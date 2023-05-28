import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditMatchComponent } from 'src/app/dialog/tournament/edittournament/edit-match/edit-match.component';
import { EditRoundComponent } from 'src/app/dialog/tournament/edittournament/edit-round/editround.component';
import { GameWinner } from 'src/app/models/gamewinner';
import { MatchNode } from 'src/app/models/matchnode';
import { PlayerDetails } from 'src/app/models/playerdetails';
import { RoundNode } from 'src/app/models/roundnode';
import { TournamentDetails } from 'src/app/models/tournamentdetails';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { EditTournamentService } from 'src/app/services/edit-tournament.service';
import { JsonService } from 'src/app/services/json-service';
import { MatchTreeService } from 'src/app/services/matchtree.service';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-editview-tournament',
  templateUrl: './editview-tournament.component.html',
  styleUrls: ['./editview-tournament.component.css']
})
export class EditviewTournamentComponent {
  newTournament : any = TournamentTree;
  image : boolean = false;
  imagefile : any;
  teamview : boolean = false;
  playerview : PlayerDetails[] = [];
  imagepath : string = '';
  champion? : GameWinner;

  //if tournament token exists, diable round modification?
  //todo:: clean up image test
  ngOnInit(): void {
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.newTournament = data;
    });
    //test for match edit / round edit views
    // this.newTournament = this.editTournamentService.createNewTournament(new TournamentDetails("Edit Match/Round Test", 1, 5, 4, "CoH2", true));
    // var roundOne = this.newTournament.rounds[0];
    // var players = ["Pob", "farlion", "jackass", "butt"];
    // var i = 0;
    // for(let match of roundOne.matchs){
    //   match.teamOne = players[i];
    //   match.teamOneName = players[i];
    //   match.teamTwo = players[i + 1];
    //   match.teamTwoName = players[i + 1];
    //   match.allowEdits = true;
    //   i++;
    //   i++;
    // }
  }
  
  constructor(private sharedTournamentService : SharedTournamentService, public dialog : MatDialog,
    private router : Router, private editTournamentService : EditTournamentService,
    private tournamentService : TournamentService, private jsonService : JsonService, 
    private matchtreeService : MatchTreeService,
    private cdr: ChangeDetectorRef){
  }

  uploadImage() : void {
    document.getElementById('fileInput')?.click();
  }

  displayImage(){

  }

  handleFileInput(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.image = true;
      this.imagefile = file;
    }
  }

  hideImage(){
    this.image = false;
    this.newTournament.displayImage = false;
  }

  editDate(round : RoundNode){
  }

  editRoundInfo(round : RoundNode){
    this.openRoundEditDialog(round);
  }

  editMatchInfo(match : MatchNode){
    if(match.allowEdits){
      this.openEditMatchDialog(match);
    }
  }
  openRoundEditDialog(roundNode : RoundNode){
    const dialogRef = this.dialog.open(EditRoundComponent, {
      data : roundNode,
    });

    dialogRef.afterClosed().subscribe(result => {
      
    })
    
    //if changes to round info/format, now edit match info(game details)
  }

  openEditMatchDialog(match : MatchNode) {
    const dialogRef = this.dialog.open(EditMatchComponent, {
      data : match,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.checkForMatchWinner(result);
      }
    })
  }
  
  private checkForMatchWinner(result : MatchNode) {
    var map = this.matchtreeService.findParentNode(result, this.newTournament.matchTree);
    var parentNode = map[1] as MatchNode;
    var position = map[0] as number;
    if(position != 0){
      if(position == 1){
        if(result.hasWinner){
            parentNode!.teamOneName = result.winner!.teamName;
            parentNode!.teamOne = result.winner!.teamPlayers;
        } else {
          parentNode!.teamOneName = "TBD";
          parentNode!.teamOne = [];
          parentNode!.teamOneScore = 0;
        }
      }
      if(position == 2){
        if(result.hasWinner){
            parentNode!.teamTwoName = result.winner!.teamName;
            parentNode!.teamTwo = result.winner!.teamPlayers;
        } else {
          parentNode!.teamTwoName = "TBD";
          parentNode!.teamTwo = [];
          parentNode!.teamTwoScore = 0;
        }
      }
      if(parentNode.teamOne!.length > 0 && parentNode.teamTwo!.length > 0){
        parentNode.allowEdits = true;
      } else {
        parentNode.allowEdits = false;
      }
    } else {
      if(result.hasWinner){
        this.champion = new GameWinner(result.winner!.teamName, result.winner!.teamPlayers, 1);
      } else {
        this.champion = undefined;
      }
    }
    this.upDateRoundArray(parentNode);
    this.cdr.detectChanges();
    
    //check for parent mode, if undefined -> champion or 3rd place
    //service for modifying matchtree/round array??
  }

  upDateRoundArray(parentNode : MatchNode){
    var roundId = parentNode.roundId! - 1;
    var roundNode = this.newTournament.rounds[roundId] as RoundNode;
    var matchIndex = 0;
    for(let match of roundNode.matchs){
      if(match.matchId == parentNode.matchId){
        this.newTournament.rounds[roundId].matchs[matchIndex] = parentNode;
        this.cdr.detectChanges();
        console.log("MatchNode AFTER");
        console.log(match);
        console.log("ParentNode AFTER");
        console.log(parentNode);
      };
      matchIndex++;
    }
  }

  viewteam(match : MatchNode){
    if (!match.teamView) {
      match.teamView = true;
    } else {
      //highlight open teamview
    }

  }

  closeteamview(){
    this.teamview = false;
    this.playerview = [];
  }

  saveTournament(saveTournament : TournamentTree){
    if(saveTournament.tournamentDocId && saveTournament.tournamentDocId != ""){
      var dto = this.jsonService.jsonTournament(saveTournament);
      this.tournamentService.updateTournament(dto, saveTournament.tournamentDocId);
    } else {
      if(this.image){
        saveTournament.displayImage = true;
        saveTournament.hasImage = true;
        saveTournament.imageFile = this.imagefile;
      }
      var dto = this.jsonService.jsonTournament(saveTournament);
      if(dto.hasImage){
        this.tournamentService.createTournamentWithImage(dto, saveTournament.imageFile!)
      } else {
        this.tournamentService.createTournament(dto);
      }
      this.sharedTournamentService.setViewTournament(saveTournament);
      this.router.navigate(['tournament/viewtournament']);
    }
  }

  publishTournament(publishTournament : TournamentTree){

  }

  cancelTournament(){

  }
}
