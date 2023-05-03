import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditMatchComponent } from 'src/app/dialog/tournament/edittournament/edit-match/edit-match.component';
import { EditRoundComponent } from 'src/app/dialog/tournament/edittournament/edit-round/editround.component';
import { MatchNode } from 'src/app/models/matchnode';
import { PlayerDetails } from 'src/app/models/playerdetails';
import { RoundNode } from 'src/app/models/roundnode';
import { TournamentDetails } from 'src/app/models/tournamentdetails';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { EditTournamentService } from 'src/app/services/edit-tournament.service';
import { JsonService } from 'src/app/services/json-service';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-editview-tournament',
  templateUrl: './editview-tournament.component.html',
  styleUrls: ['./editview-tournament.component.css']
})
export class EditviewTournamentComponent {
  newTournament : any;
  image : boolean = false;
  teamview : boolean = false;
  playerview : PlayerDetails[] = [];
  imagepath : string = '';

  //if tournament token exists, diable round modification?
  
  ngOnInit(): void {
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.newTournament = data;
    });
  }
  
  constructor(private sharedTournamentService : SharedTournamentService, public dialog : MatDialog,
    private router : Router, private editTournamentService : EditTournamentService,
    private tournamentService : TournamentService, private jsonService : JsonService){
  }

  displayImage(){
    if(this.newTournament.hasImage){
      this.image = true;
      this.newTournament.displayImage = true;
      var imageSave = "./assets/images/imagetest.jpg";
      if(imageSave){
        var reader = new FileReader();
        var imageString = '';
        reader.onload = (e : any) => {
          var image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            var basepath = e.target.result;
            this.imagepath = basepath;
          };
        };
        //reader.readAsDataURL();
      }
    }
  }

  hideImage(){
    this.image = false;
    this.newTournament.displayImage = false;
  }

  uploadImage(){

  }

  editDate(round : RoundNode){
  }

  editRoundInfo(round : RoundNode){
    this.openRoundEditDialog(round);
  }

  editMatchInfo(match : MatchNode){
    console.log(match);
    this.openEditMatchDialog(match);
  }
  openRoundEditDialog(roundNode : RoundNode){
    const dialogRef = this.dialog.open(EditRoundComponent, {
      data : roundNode,
    });

    dialogRef.afterClosed().subscribe(result => {
      roundNode = result;
    })
    
    //if changes to round info/format, now edit match info(game details)
  }

  openEditMatchDialog(match : MatchNode) {
    const dialogRef = this.dialog.open(EditMatchComponent, {
      data : match,
    });

    dialogRef.afterClosed().subscribe(result => {
      match = result;
    })
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
    var dto = this.jsonService.jsonTournament(saveTournament);
    this.tournamentService.create(dto);
    this.sharedTournamentService.setViewTournament(saveTournament);
    this.router.navigate(['tournament/viewtournament']);
  }

  cancelTournament(){

  }
}
