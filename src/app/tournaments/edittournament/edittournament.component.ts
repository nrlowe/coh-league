import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditRoundComponent } from 'src/app/dialog/tournament/edittournament/edit-round/editround.component';
import { MatchNode } from 'src/app/models/matchnode';
import { RoundNode } from 'src/app/models/roundnode';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditMatchComponent } from 'src/app/dialog/tournament/edittournament/edit-match/edit-match.component';

@Component({
  selector: 'app-edittournament',
  templateUrl: './edittournament.component.html',
  styleUrls: ['./edittournament.component.css']
})
export class EdittournamentComponent {
  editTournament? : any;
  bracketView : boolean = false;
  constructor(private sharedTournamentService : SharedTournamentService, 
    private router : Router,  public dialog : MatDialog){

  }

  ngOnInit(){
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.editTournament = data;
    });
  }

  brackView(){
    this.bracketView = true;
  }

  matchView(){
    this.bracketView = false;
  }

  editDate(round : RoundNode){
    round.date = "March 2025";
    round.roundName = "Round 50";
  }

  openRoundEditDialog(roundNode : RoundNode){
    const dialogRef = this.dialog.open(EditRoundComponent, {
      data : roundNode,
    });

    dialogRef.afterClosed().subscribe(result => {
      roundNode = result;
    })
  }

  openEditMatchDialog(match : MatchNode) {
    const dialogRef = this.dialog.open(EditMatchComponent, {
      data : match,
    });

    dialogRef.afterClosed().subscribe(result => {
      match = result;
    })
  }

  saveTournament(tournamentTree : TournamentTree){
    
  }

  proceedToView(tournamentTree : TournamentTree) {
    this.sharedTournamentService.setNewTournament(tournamentTree);
    this.router.navigate(['/viewtournament']);
  }
}

//get tournament, get players(for specified game)
//option to create new player/update player(if current steam name is wrong) check via steam id