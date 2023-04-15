import { Component, OnInit, Input, Inject } from '@angular/core';
import { RoundDetails } from 'src/app/models/rounddetails';
import { RoundNode } from 'src/app/models/roundnode';
import { MatchNode } from 'src/app/models/matchnode';
import { Tournament } from 'src/app/models/tournament';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPseudoCheckbox } from '@angular/material/core';
import { EditMatchComponent } from 'src/app/dialog/tournament/edittournament/edit-match/edit-match.component';
import { EditRoundComponent } from 'src/app/dialog/tournament/edittournament/edit-round/editround.component';

@Component({
  selector: 'app-viewtournament',
  templateUrl: './viewtournament.component.html',
  styleUrls: ['./viewtournament.component.css']
})
export class ViewtournamentComponent implements OnInit{
  newTournament : any;
  ngOnInit(): void {
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.newTournament = data;
    });
    
  }
  
  constructor(private sharedTournamentService : SharedTournamentService, public dialog : MatDialog){
    
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

  

}

