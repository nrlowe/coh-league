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
import { EditTournamentService } from 'src/app/services/edit-tournament.service';
import { TournamentDetails } from 'src/app/models/tournamentdetails';
import { PlayerDetails } from 'src/app/models/playerdetails';
import { Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-viewtournament',
  templateUrl: './viewtournament.component.html',
  styleUrls: ['./viewtournament.component.css']
})
export class ViewtournamentComponent implements OnInit{
  tournamentView : any;
  teamview : boolean = false;
  playerview : PlayerDetails[] = [];
  ngOnInit(): void {
    this.sharedTournamentService.getViewTournament().subscribe(data => {
      this.tournamentView = data;
    });
  }
  
  constructor(private sharedTournamentService : SharedTournamentService, public dialog : MatDialog,
    private router : Router, private editTournamentService : EditTournamentService,
    private tournamentService : TournamentService){
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

}

